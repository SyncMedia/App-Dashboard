
import { Button } from "@/components/ui/button";

const PowerUpCTA = () => {
  return (
    <section id="powerup" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/10 via-[#32F594]/5 to-[#38BDF8]/10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
              Power-up Your{" "}
              <span className="bg-gradient-to-r from-[#32F594] to-[#38BDF8] bg-clip-text text-transparent">
                Campaigns
              </span>
            </h2>
            <p className="text-lg text-[#8B93A1] mb-8 leading-relaxed">
              Ready to transform your audience insights? Join leading brands who trust 
              Sync Pulse to deliver actionable data that drives real business results.
            </p>
            <Button 
              size="lg"
              className="bg-[#32F594] hover:bg-[#32F594]/80 text-black font-semibold px-8 py-3 text-lg"
            >
              Get a demo
            </Button>
          </div>

          <div className="relative">
            {/* Mini dashboard mock */}
            <div className="relative bg-gradient-to-br from-[#1A1F2E] to-[#0D1117] rounded-xl border border-[#7C3AED]/30 p-4 shadow-2xl">
              <div className="bg-[#0D1117] rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">Snapshot View</h3>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#32F594] rounded-full" />
                    <div className="w-2 h-2 bg-[#38BDF8] rounded-full" />
                    <div className="w-2 h-2 bg-[#7C3AED] rounded-full" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {["Active Users", "Engagement", "Conversion", "Revenue"].map((label, i) => (
                    <div key={i} className="bg-[#1A1F2E] p-3 rounded border border-white/5">
                      <div className="text-xs text-[#8B93A1] mb-1">{label}</div>
                      <div className="text-lg font-bold text-white">
                        {i === 0 ? "24.7K" : i === 1 ? "84%" : i === 2 ? "12.3%" : "$18K"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating wave decoration */}
            <div className="absolute -bottom-10 -right-10 opacity-20">
              <svg width="200" height="100" viewBox="0 0 200 100" className="text-[#32F594]">
                <path
                  d="M0,50 Q50,20 100,50 T200,50"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PowerUpCTA;
