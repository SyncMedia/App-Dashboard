
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface KpiDataItemType {
  headline: string,
  value: string | number,
  delta?: { value: number, period: string },
  // trend: Array<{ date: string, value: number }>
}
interface KpiCardProps {
  item: KpiDataItemType;
  onClick?: () => void;
}

const KpiCard = ({ item, onClick }: KpiCardProps) => {
  const deltaColor = item.delta && item.delta.value > 0 ? "text-[#10B981]" : item.delta && item.delta.value < 0 ? "text-[#EF4444]" : "text-[#64748B]";
  const TrendIcon = item.delta && item.delta.value > 0 ? TrendingUp : TrendingDown;

  // const maxTrend = Math.max(...item.trend.map(point => point.value), 1); // Avoid division by zero

  return (
    <Card
      className="bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm text-[#64748B] font-medium uppercase tracking-wide">{item.headline}</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-[#0F172A]">{item.value}</span>
            {item.delta && (
              <div className={`flex items-center space-x-1 text-sm ${deltaColor}`}>
                <TrendIcon className="w-3 h-3" />
                <span>{Math.abs(item.delta.value)}%</span>
                <span className="text-[#64748B]">{item.delta.period}</span>
              </div>
            )}
          </div>
          {/* {item.trend && (
            <div className="h-8 flex items-end space-x-1">
              {item.trend.map((point, index) => (
                <div
                  key={index}
                  className="bg-[#3F5BF6]/30 w-2 rounded-sm"
                  style={{ height: `${(point.value / maxTrend) * 100}%` }}
                />
              ))}
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
