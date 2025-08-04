
import FeatureGrid from "@/components/FeatureGrid";
import { Award, Shield, Users, Star } from "lucide-react";

const Advantage = () => {
  const features = [
    {
      icon: Award,
      heading: "Award-Winning Federated Technology",
      body: "Industry-recognized technology that delivers unparalleled data insights across multiple touchpoints."
    },
    {
      icon: Shield,
      heading: "Accurate, Trustworthy Data",
      body: "Rigorous validation processes ensure the highest quality and reliability of all data insights."
    },
    {
      icon: Users,
      heading: "High-Quality & Sizeable Panel",
      body: "Access to millions of verified panel members across diverse demographics and markets."
    },
    {
      icon: Star,
      heading: "Expert Team",
      body: "Dedicated specialists with deep industry knowledge to support your success every step of the way."
    }
  ];

  return (
    <section id="advantage" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
            The Sync Pulse{" "}
            <span className="bg-gradient-to-r from-[#32F594] to-[#38BDF8] bg-clip-text text-transparent">
              Advantage
            </span>
          </h2>
          <p className="text-lg text-[#8B93A1] max-w-2xl mx-auto">
            What sets us apart in the competitive landscape of audience insights
          </p>
        </div>

        <FeatureGrid features={features} />
      </div>
    </section>
  );
};

export default Advantage;
