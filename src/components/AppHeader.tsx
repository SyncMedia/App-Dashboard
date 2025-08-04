
import { Search } from "lucide-react";

interface AppHeaderProps {
  breadcrumbs?: string[];
}

const AppHeader = ({ breadcrumbs = ["Dashboard"] }: AppHeaderProps) => {
  return (
    <header className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#3F5BF6] to-[#38BDF8] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SP</span>
            </div>
            <span className="text-xl font-bold text-[#3F5BF6]">SYNC Pulse</span>
          </div>
          
          <nav className="flex items-center space-x-2 text-sm text-[#64748B]">
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                <span className={index === breadcrumbs.length - 1 ? "text-[#0F172A]" : ""}>
                  {crumb}
                </span>
              </span>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input 
              type="text" 
              placeholder="Search apps, categories..."
              className="pl-10 pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#3F5BF6] w-64"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
