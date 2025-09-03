
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  title: string;
  segments: DonutSegment[];
}

const DonutChart = ({ title, segments }: DonutChartProps) => {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  let cumulativePercentage = 0;
  const segmentsWithOffset = segments.map(segment => {
    const percentage = (segment.value / total) * 100;
    const offset = cumulativePercentage;
    cumulativePercentage += percentage;
    return { ...segment, percentage, offset };
  });

  return (
    <Card className="bg-white border border-[#E2E8F0] shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-[#0F172A]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-6">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#F8FAFC"
              strokeWidth="20"
            />
            {segmentsWithOffset.map((segment, index) => (
              <circle
                key={index}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={segment.color}
                strokeWidth="20"
                strokeDasharray={`${segment.percentage * 2.51} ${100 * 2.51}`}
                strokeDashoffset={`${-segment.offset * 2.51}`}
                className="transition-all duration-300"
              />
            ))}
          </svg>
        </div>
        <div className="space-y-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-sm text-[#64748B]">{segment.label}</span>
              <span className="text-sm text-[#0F172A] font-medium">
                {((segment.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DonutChart;
