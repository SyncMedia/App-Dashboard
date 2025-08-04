
import { Button } from "@/components/ui/button";
import DashboardMock from "@/components/DashboardMock";
import { Loader2 } from "lucide-react";

const Hero = () => {
  return (
    <section id="hero" className="relative pt-24 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/10 via-[#0D1117] to-[#0D1117]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Tag pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#32F594]/10 border border-[#32F594]/20 mb-8">
            <Loader2 className="w-4 h-4 animate-spin text-[#32F594]" />
            <span className="text-sm text-[#32F594] font-medium">
              Launching cross-media insights
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Get real-time insights on your{" "}
            <span className="bg-gradient-to-r from-[#32F594] to-[#38BDF8] bg-clip-text text-transparent">
              most-relevant app users
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#8B93A1] mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover actionable consumer insights through our federated technology.
            Empower your brand with data-driven decisions that drive real results.
          </p>

          {/* CTA Button */}
          <Button 
            size="lg"
            className="bg-[#32F594] hover:bg-[#32F594]/80 text-black font-semibold px-8 py-3 text-lg mb-16"
          >
            See it live
          </Button>

          {/* Dashboard showcase */}
          <DashboardMock />
        </div>
      </div>
    </section>
  );
};

export default Hero;
