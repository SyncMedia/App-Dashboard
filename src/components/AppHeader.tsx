
import { logout } from "@/utils/auth";
import { LogoutIcon } from "@/utils/icons";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

interface AppHeaderProps {
  breadcrumbs?: string[];
}

const AppHeader = ({ breadcrumbs = ["Dashboard"] }: AppHeaderProps) => {
  return (
    <header className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-4">
      <div className="flex-col items-center space-y-6">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/home" className="">
              <img
                src="/assets/images/logo_large.png"
                className="w-[48px] h-[48px]"
              />
            </Link>

            <Link
              to="/home"
              className="text-xl font-bold text-brand-blue ml-5"
            >
              SYNC Appography
            </Link>
          </div>

          <LogoutIcon className="w-4 h-4" onClick={logout} />
        </div>

        <div className="flex flex-col items-start md:items-center md:justify-between md:space-x-6 space-y-2 md:flex-row">

          <nav className="flex items-center text-sm text-[#64748B]">
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                <span className={index === breadcrumbs.length - 1 ? "text-[#0F172A] font-medium" : ""}>
                  {crumb}
                </span>
              </span>
            ))}
          </nav>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search apps, categories..."
              className="pl-10 pr-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#3F5BF6] w-full md:w-64"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
