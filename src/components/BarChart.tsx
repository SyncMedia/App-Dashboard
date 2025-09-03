
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  title: string;
  data: BarData[];
  height?: number;
}

const BarChart = ({ title, data, height = 200 }: BarChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <Card className="bg-white border border-[#E2E8F0] shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-[#0F172A]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4" style={{ height }}>
          {data.map((item, index) => (
            <div key={item.label} className="flex items-center space-x-3">
              <div className="w-16 text-sm text-[#64748B] text-right">
                {item.label}
              </div>
              <div className="flex-1 flex items-center space-x-2">
                <div
                  className="h-6 rounded-md transition-all duration-300"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    minWidth: '2px',
                    backgroundColor: item.color || '#3F5BF6'
                  }}
                />
                <span className="text-sm text-[#0F172A] font-medium w-12">
                  {item.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChart;
