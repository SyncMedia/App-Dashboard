
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const TestimonialCard = ({ quote, author, role, company }: TestimonialCardProps) => {
  return (
    <Card className="bg-[#1A1F2E] border-white/10 hover:border-[#32F594]/30 transition-all duration-300">
      <CardContent className="p-8">
        <div className="mb-6">
          <svg className="w-8 h-8 text-[#32F594] mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
        </div>
        
        <blockquote className="text-lg text-white mb-6 leading-relaxed">
          "{quote}"
        </blockquote>
        
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-[#32F594] to-[#38BDF8] rounded-full flex items-center justify-center mr-4">
            <span className="text-black font-semibold text-lg">
              {author.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="font-semibold text-white">{author}</div>
            <div className="text-sm text-[#8B93A1]">{role} at {company}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
