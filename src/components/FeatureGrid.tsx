
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  heading: string;
  body: string;
}

interface FeatureGridProps {
  features: Feature[];
}

const FeatureGrid = ({ features }: FeatureGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className="flex gap-6 p-6 rounded-lg hover:bg-[#1A1F2E]/50 transition-all duration-300 group"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-[#32F594]/20 to-[#38BDF8]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6 text-[#32F594]" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.heading}
              </h3>
              <p className="text-[#8B93A1] leading-relaxed">
                {feature.body}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureGrid;
