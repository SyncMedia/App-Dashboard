
import BenefitStatCard from "@/components/BenefitStatCard";

const BenefitStats = () => {
  const stats = [
    { value: "95%", metric: "Higher Quality Data" },
    { value: "10×", metric: "Completion Rate" },
    { value: "25%", metric: "Higher Awareness" },
    { value: "40%", metric: "Better Targeting" }
  ];

  return (
    <section id="kpis" className="py-20 bg-[#1A1F2E]/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
            Measurable{" "}
            <span className="bg-gradient-to-r from-[#32F594] to-[#38BDF8] bg-clip-text text-transparent">
              Impact
            </span>
          </h2>
          <p className="text-lg text-[#8B93A1]">
            Real results that drive business growth
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <BenefitStatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitStats;
