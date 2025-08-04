
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface KpiCardProps {
  headline: string;
  value: string;
  delta?: {
    value: number;
    period: string;
  };
  trend?: number[];
  onClick?: () => void;
}

const KpiCard = ({ headline, value, delta, trend, onClick }: KpiCardProps) => {
  const deltaColor = delta && delta.value > 0 ? "text-[#10B981]" : delta && delta.value < 0 ? "text-[#EF4444]" : "text-[#64748B]";
  const TrendIcon = delta && delta.value > 0 ? TrendingUp : TrendingDown;

  return (
    <Card 
      className="bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm text-[#64748B] font-medium uppercase tracking-wide">{headline}</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-[#0F172A]">{value}</span>
            {delta && (
              <div className={`flex items-center space-x-1 text-sm ${deltaColor}`}>
                <TrendIcon className="w-3 h-3" />
                <span>{Math.abs(delta.value)}%</span>
                <span className="text-[#64748B]">{delta.period}</span>
              </div>
            )}
          </div>
          {trend && (
            <div className="h-8 flex items-end space-x-1">
              {trend.map((point, index) => (
                <div
                  key={index}
                  className="bg-[#3F5BF6]/30 w-2 rounded-sm"
                  style={{ height: `${(point / Math.max(...trend)) * 100}%` }}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
