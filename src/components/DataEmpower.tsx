
import { Card, CardContent } from "@/components/ui/card";

const DataEmpower = () => {
  return (
    <section id="data" className="py-20 relative">
      {/* Background wave separator */}
      <div className="absolute top-0 w-full">
        <svg width="100%" height="60" viewBox="0 0 1200 60" className="text-[#7C3AED]/20">
          <path
            d="M0,30 Q300,0 600,30 T1200,30 L1200,60 L0,60 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
              Data That{" "}
              <span className="bg-gradient-to-r from-[#32F594] to-[#38BDF8] bg-clip-text text-transparent">
                Empowers
              </span>
            </h2>
            <p className="text-lg text-[#8B93A1] leading-relaxed">
              Our federated technology delivers unparalleled insights into consumer behavior, 
              enabling media brands to make data-driven decisions with confidence. From audience 
              segmentation to campaign optimization, we provide the tools you need to succeed 
              in today's competitive landscape.
            </p>
          </div>

          <div className="relative">
            <Card className="bg-gradient-to-br from-[#1A1F2E] to-[#0D1117] border border-[#32F594]/30 p-1 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-sm text-[#32F594] font-medium mb-2">Industry Focus</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">CPG & D2C Brands</h3>
                  <p className="text-[#8B93A1] mb-6">
                    Specialized insights for consumer packaged goods and direct-to-consumer businesses
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#32F594]">95%</div>
                      <div className="text-xs text-[#8B93A1]">Data Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#38BDF8]">10M+</div>
                      <div className="text-xs text-[#8B93A1]">Panel Members</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataEmpower;
