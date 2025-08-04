
import { Card, CardContent } from "@/components/ui/card";

interface BenefitStatCardProps {
  value: string;
  metric: string;
}

const BenefitStatCard = ({ value, metric }: BenefitStatCardProps) => {
  return (
    <Card className="bg-[#1A1F2E] border border-[#32F594]/20 hover:border-[#32F594]/40 transition-all duration-300 group hover:-translate-y-1">
      <CardContent className="p-8 text-center">
        <div className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-[#32F594] to-[#38BDF8] bg-clip-text text-transparent">
          {value}
        </div>
        <div className="text-[#8B93A1] font-medium">
          {metric}
        </div>
      </CardContent>
    </Card>
  );
};

export default BenefitStatCard;
