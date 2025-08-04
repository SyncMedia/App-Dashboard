
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LineData {
  date: string;
  value: number;
}

interface CategoryData {
  [key: string]: {
    name: string;
    subtitle?: string;
    publisher?: string;
    category?: string;
  };
}

interface LineChartProps {
  title: string;
  data: LineData[];
  comparisonData?: { [key: string]: LineData[] };
  currentCategory?: string;
  categoryNames?: CategoryData;
}

const LineChart = ({ title, data, comparisonData, currentCategory = 'social', categoryNames }: LineChartProps) => {
  const [compareCategory, setCompareCategory] = useState<string>("none");

  const maxValue = comparisonData && compareCategory !== "none"
    ? Math.max(
        ...data.map(d => d.value),
        ...comparisonData[compareCategory]?.map(d => d.value) || []
      )
    : Math.max(...data.map(d => d.value));
  
  const minValue = comparisonData && compareCategory !== "none"
    ? Math.min(
        ...data.map(d => d.value),
        ...comparisonData[compareCategory]?.map(d => d.value) || []
      )
    : Math.min(...data.map(d => d.value));
  
  const range = maxValue - minValue;

  // Create SVG path for the line with broader dimensions
  const createPath = (lineData: LineData[], color: string) => {
    const width = 800; // Increased width for broader look
    const height = 200; // Increased height
    const padding = 40; // Increased padding

    return lineData.map((point, index) => {
      const x = padding + (index * (width - 2 * padding)) / (lineData.length - 1);
      const y = height - padding - ((point.value - minValue) / range) * (height - 2 * padding);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const getComparisonOptions = () => {
    if (!comparisonData || !categoryNames) return [];
    
    return Object.keys(comparisonData)
      .filter(key => key !== currentCategory)
      .map(key => ({
        value: key,
        label: categoryNames[key]?.name || key
      }));
  };

  const comparisonLineData = comparisonData && compareCategory !== "none" ? comparisonData[compareCategory] : null;

  // Check if we're dealing with apps (has publisher) or categories (has subtitle)
  const isAppComparison = categoryNames && Object.values(categoryNames)[0]?.publisher;
  const getDisplayLabel = (key: string) => {
    if (!categoryNames?.[key]) return key;
    return categoryNames[key].name;
  };

  return (
    <Card className="bg-white border border-[#E2E8F0] shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-[#0F172A]">{title}</CardTitle>
          {comparisonData && (
            <div className="flex flex-col space-y-2">
              <span className="text-xs text-[#64748B] font-medium">Compare</span>
              <Select value={compareCategory} onValueChange={setCompareCategory}>
                <SelectTrigger className="w-36 bg-white border-[#E2E8F0] text-[#0F172A] text-xs">
                  <SelectValue placeholder={isAppComparison ? "Select app" : "Select category"} />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#E2E8F0] text-[#0F172A]">
                  <SelectItem value="none">None</SelectItem>
                  {getComparisonOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <svg viewBox="0 0 800 280" className="w-full h-full">
            {/* Grid lines */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3F5BF6" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
              <linearGradient id="comparisonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
            
            {/* Grid - updated for new dimensions */}
            {[0, 1, 2, 3, 4, 5].map(i => (
              <line
                key={i}
                x1="40"
                y1={60 + i * 26.67}
                x2="760"
                y2={60 + i * 26.67}
                stroke="#E2E8F0"
                strokeOpacity="0.5"
                strokeWidth="1"
              />
            ))}
            
            {/* Vertical grid lines for better readability */}
            {data.map((_, index) => (
              <line
                key={`v-${index}`}
                x1={40 + (index * 720) / (data.length - 1)}
                y1="60"
                x2={40 + (index * 720) / (data.length - 1)}
                y2="220"
                stroke="#E2E8F0"
                strokeOpacity="0.3"
                strokeWidth="1"
              />
            ))}
            
            {/* Main line */}
            <path
              d={createPath(data, "#3F5BF6")}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(0, 20)"
            />
            
            {/* Comparison line */}
            {comparisonLineData && (
              <path
                d={createPath(comparisonLineData, "#7C3AED")}
                fill="none"
                stroke="url(#comparisonGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="5,5"
                transform="translate(0, 20)"
              />
            )}
            
            {/* Main data points with value labels positioned well above the line */}
            {data.map((point, index) => {
              const x = 40 + (index * 720) / (data.length - 1);
              const y = 80 + 120 - ((point.value - minValue) / range) * 120;
              return (
                <g key={index}>
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#3F5BF6"
                    stroke="white"
                    strokeWidth="2"
                  />
                  {/* Value label positioned well above the data point */}
                  <text
                    x={x}
                    y={y - 25}
                    textAnchor="middle"
                    fill="#0F172A"
                    fontSize="12"
                    fontWeight="600"
                  >
                    {point.value}M
                  </text>
                </g>
              );
            })}

            {/* Comparison data points with value labels positioned well above the line */}
            {comparisonLineData && comparisonLineData.map((point, index) => {
              const x = 40 + (index * 720) / (comparisonLineData.length - 1);
              const y = 80 + 120 - ((point.value - minValue) / range) * 120;
              return (
                <g key={`comp-${index}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#7C3AED"
                    stroke="white"
                    strokeWidth="2"
                  />
                  {/* Comparison value label positioned well above the data point */}
                  <text
                    x={x}
                    y={y - 25}
                    textAnchor="middle"
                    fill="#7C3AED"
                    fontSize="12"
                    fontWeight="600"
                  >
                    {point.value}M
                  </text>
                </g>
              );
            })}

            {/* X-axis date labels */}
            {data.map((point, index) => {
              const x = 40 + (index * 720) / (data.length - 1);
              return (
                <text
                  key={`x-label-${index}`}
                  x={x}
                  y="245"
                  textAnchor="middle"
                  fill="#64748B"
                  fontSize="11"
                  fontWeight="500"
                >
                  {point.date}
                </text>
              );
            })}
          </svg>

          {/* Legend */}
          {comparisonLineData && (
            <div className="flex justify-center space-x-6 mt-3">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-0.5 bg-gradient-to-r from-[#3F5BF6] to-[#38BDF8] rounded"></div>
                <span className="text-xs text-[#0F172A] font-medium">
                  {getDisplayLabel(currentCategory)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-0.5 bg-gradient-to-r from-[#7C3AED] to-[#F97316] opacity-80 rounded" style={{backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, #7C3AED 2px, #7C3AED 4px)'}}></div>
                <span className="text-xs text-[#0F172A] font-medium">
                  {getDisplayLabel(compareCategory)}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChart;
