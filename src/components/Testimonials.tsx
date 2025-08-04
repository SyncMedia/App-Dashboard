
import TestimonialCard from "@/components/TestimonialCard";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Sync Pulse has transformed how we understand our audience. The insights are incredibly detailed and actionable.",
      author: "Sarah Chen",
      role: "VP of Marketing",
      company: "TechFlow"
    },
    {
      quote: "The real-time data capabilities have given us a competitive edge we never had before. Outstanding platform.",
      author: "Marcus Rodriguez",
      role: "Data Director",
      company: "BrandMax"
    }
  ];

  const logoPartners = [
    "TechFlow", "BrandMax", "DataCorp", "MediaPlus", "InsightLab", "AnalyticsPro"
  ];

  return (
    <section id="testimonials" className="py-20 bg-[#1A1F2E]/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            Trusted by the{" "}
            <span className="bg-gradient-to-r from-[#32F594] to-[#38BDF8] bg-clip-text text-transparent">
              Best
            </span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>

        {/* Logo bar */}
        <div className="overflow-hidden">
          <div className="flex animate-scroll space-x-12">
            {[...logoPartners, ...logoPartners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 text-[#8B93A1] font-semibold text-lg opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
