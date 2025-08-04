
import { Home, BarChart3, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavTab {
  id: string;
  label: string;
  icon: any;
  href: string;
}

interface PrimaryNavTabsProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const PrimaryNavTabs = ({ activeTab = "home", onTabChange }: PrimaryNavTabsProps) => {
  const navigate = useNavigate();
  
  const tabs: NavTab[] = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    { id: "category", label: "Category", icon: BarChart3, href: "/category/social" },
    { id: "app", label: "App", icon: Smartphone, href: "/app/instagram" }
  ];

  const handleTabClick = (tab: NavTab) => {
    onTabChange?.(tab.id);
    navigate(tab.href);
  };

  return (
    <nav className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                isActive 
                  ? "border-[#3F5BF6] text-[#3F5BF6]" 
                  : "border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-[#64748B]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default PrimaryNavTabs;
