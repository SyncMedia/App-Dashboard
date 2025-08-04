
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SolutionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const SolutionCard = ({ icon: Icon, title, description, href }: SolutionCardProps) => {
  return (
    <Card className="bg-[#1A1F2E] border-white/10 hover:border-[#32F594]/30 transition-all duration-300 group hover:-translate-y-1">
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#32F594]/20 to-[#38BDF8]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-[#32F594]" />
        </div>
        
        <h3 className="text-xl font-semibold mb-4 text-white">
          {title}
        </h3>
        
        <p className="text-[#8B93A1] mb-6 leading-relaxed">
          {description}
        </p>
        
        <Button 
          variant="link" 
          className="text-[#32F594] hover:text-[#32F594]/80 p-0 h-auto font-medium"
        >
          Learn more →
        </Button>
      </CardContent>
    </Card>
  );
};

export default SolutionCard;
