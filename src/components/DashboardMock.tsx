
const DashboardMock = () => {
  return (
    <div className="relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#32F594]/20 to-[#38BDF8]/20 blur-3xl rounded-3xl" />
      
      {/* Dashboard container */}
      <div className="relative bg-gradient-to-br from-[#1A1F2E] to-[#0D1117] rounded-2xl border border-[#7C3AED]/50 p-1 shadow-2xl">
        <div className="bg-[#0D1117] rounded-xl overflow-hidden">
          {/* Mock dashboard header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-400 rounded-full" />
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              <div className="w-3 h-3 bg-green-400 rounded-full" />
            </div>
            <div className="text-xs text-[#8B93A1]">Sync Pulse Dashboard</div>
          </div>

          {/* Mock dashboard content */}
          <div className="p-6 space-y-6">
            {/* Top metrics row */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {[
                { label: "Active Users", value: "247K", change: "+12%" },
                { label: "Engagement Rate", value: "84%", change: "+5%" },
                { label: "Conversion", value: "12.3%", change: "+8%" },
                { label: "Revenue", value: "$180K", change: "+15%" },
              ].map((metric, i) => (
                <div key={i} className="bg-[#1A1F2E] p-4 rounded-lg border border-white/5">
                  <div className="text-xs text-[#8B93A1] mb-1">{metric.label}</div>
                  <div className="text-xl font-bold text-white">{metric.value}</div>
                  <div className="text-xs text-[#32F594]">{metric.change}</div>
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="bg-[#1A1F2E] p-6 rounded-lg border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Audience Insights</h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-[#32F594] rounded-full" />
                  <div className="w-3 h-3 bg-[#38BDF8] rounded-full" />
                  <div className="w-3 h-3 bg-[#7C3AED] rounded-full" />
                </div>
              </div>
              {/* Mock chart bars */}
              <div className="flex items-end gap-2 h-32">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-[#32F594]/60 to-[#38BDF8]/60 rounded-t"
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative wave SVG */}
      <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-full opacity-20">
        <svg width="100%" height="100" viewBox="0 0 800 100" className="text-[#32F594]">
          <path
            d="M0,50 Q200,10 400,50 T800,50"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4,4"
          />
        </svg>
      </div>
    </div>
  );
};

export default DashboardMock;
