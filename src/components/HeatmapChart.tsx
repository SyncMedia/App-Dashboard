
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface HeatmapData {
  hour: string;
  day: string;
  value: number;
}

interface HeatmapChartProps {
  title: string;
  data: HeatmapData[];
}

const HeatmapChart = ({ title, data }: HeatmapChartProps) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));

  // Get the max value for color scaling
  const maxValue = Math.max(...data.map(d => d.value));

  // Create a lookup map for the data
  const dataMap = new Map<string, number>();
  data.forEach(item => {
    const key = `${item.day}-${item.hour}`;
    dataMap.set(key, item.value);
  });

  // Function to get color intensity based on value
  const getColorIntensity = (value: number) => {
    const intensity = value / maxValue;
    return intensity;
  };

  // Function to get the background color
  const getBackgroundColor = (day: string, hour: string) => {
    const key = `${day}-${hour}`;
    const value = dataMap.get(key) || 0;
    const intensity = getColorIntensity(value);

    // Create a gradient from light to bright using our theme colors
    if (intensity === 0) return 'rgba(63, 91, 246, 0.1)';
    if (intensity < 0.2) return 'rgba(63, 91, 246, 0.2)';
    if (intensity < 0.4) return 'rgba(63, 91, 246, 0.4)';
    if (intensity < 0.6) return 'rgba(63, 91, 246, 0.6)';
    if (intensity < 0.8) return 'rgba(63, 91, 246, 0.8)';
    return 'rgba(63, 91, 246, 1)';
  };

  return (
    <Card className="bg-white border border-[#E2E8F0] shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-[#0F172A]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Hour labels - all 24 hours */}
          <div className="grid grid-cols-25 gap-1 text-xs">
            <div className="w-8"></div>
            {hours.map(hour => (
              <div key={hour} className="text-center text-[#64748B] font-medium">
                {hour}
              </div>
            ))}
          </div>

          {/* Days and cells */}
          {days.map(day => (
            <div key={day} className="grid grid-cols-25 gap-1 items-center">
              <div className="text-xs text-[#64748B] font-medium w-8">
                {day}
              </div>
              {hours.map(hour => {
                const key = `${day}-${hour}`;
                const value = dataMap.get(key) || 0;
                return (
                  <div
                    key={hour}
                    className="h-6 rounded border border-[#E2E8F0] flex items-center justify-center cursor-pointer hover:border-[#3F5BF6] transition-colors"
                    style={{
                      backgroundColor: getBackgroundColor(day, hour)
                    }}
                    title={`${day} ${hour}:00 - ${value}M users`}
                  >
                    {value > 0 && (
                      <span className="text-xs font-medium text-white opacity-90">
                        {value}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-xs text-[#64748B]">Less</span>
            <div className="flex space-x-1">
              {[0.1, 0.2, 0.4, 0.6, 0.8, 1].map((intensity, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor: `rgba(63, 91, 246, ${intensity})`
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-[#64748B]">More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeatmapChart;
