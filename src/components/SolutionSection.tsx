
import SolutionCard from "@/components/SolutionCard";
import { Users, Target, BarChart3 } from "lucide-react";

const SolutionSection = () => {
  const solutions = [
    {
      icon: Users,
      title: "Consumer Insights",
      description: "Deep dive into consumer behavior patterns and preferences with real-time analytics and comprehensive demographic data.",
      href: "#"
    },
    {
      icon: Target,
      title: "Audience Activation",
      description: "Activate your most valuable audience segments with precision targeting and personalized campaign strategies.",
      href: "#"
    },
    {
      icon: BarChart3,
      title: "Panel Surveys",
      description: "Conduct high-quality surveys with our extensive panel network and get reliable, actionable insights.",
      href: "#"
    }
  ];

  return (
    <section id="solutions" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-[#32F594] to-[#38BDF8] bg-clip-text text-transparent">
              Media Solutions
            </span>
          </h2>
          <p className="text-lg text-[#8B93A1] max-w-2xl mx-auto">
            Everything you need to understand and activate your audience across all channels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <SolutionCard key={index} {...solution} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
