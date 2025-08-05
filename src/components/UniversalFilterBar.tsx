
import { Calendar, MapPin, Users, User, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

interface FilterState {
  dateRange: string;
  metro: string;
  nccs: string;
  gender: string;
  ageGroup: string;
}

interface UniversalFilterBarProps {
  filters?: FilterState;
  onFiltersChange?: (filters: FilterState) => void;
}

const defaultFilters = {
  dateRange: "Last 7 days",
  metro: "All Metros",
  nccs: "All NCCS",
  gender: "All Genders",
  ageGroup: "All Ages"
};

export const loadFilters = () => {
  const savedFilters = JSON.parse(localStorage.getItem("universalFilters") || "{}");
  return { ...defaultFilters, ...savedFilters };
}

const UniversalFilterBar = ({
  onFiltersChange
}: UniversalFilterBarProps) => {

  const [filters, setFilters] = useState(loadFilters);

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    localStorage.setItem("universalFilters", JSON.stringify(newFilters));
    setFilters(newFilters);
  };

  useEffect(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange])

  return (
    <div className="bg-white border-b border-[#E2E8F0] px-6 py-3">
      <span className="text-sm text-[#64748B] font-medium block md:hidden">Filters:</span>

      <div className="flex flex-wrap items-start justify-start md:items-center space-x-2 space-y-2 md:space-y-0">
        <span className="text-sm text-[#64748B] font-medium hidden md:block">Filters:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2 bg-white border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]">
              <Calendar className="w-4 h-4" />
              <span>{filters.dateRange}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-[#E2E8F0]">
            {["Last 7 days", "Last 30 days", "Last 90 days", "Custom range"].map((range) => (
              <DropdownMenuItem
                key={range}
                onClick={() => updateFilter("dateRange", range)}
                className="text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                {range}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2 bg-white border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]">
              <MapPin className="w-4 h-4" />
              <span>{filters.metro}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-[#E2E8F0]">
            {["All Metros", "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad"].map((metro) => (
              <DropdownMenuItem
                key={metro}
                onClick={() => updateFilter("metro", metro)}
                className="text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                {metro}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2 bg-white border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]">
              <Users className="w-4 h-4" />
              <span>{filters.nccs}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-[#E2E8F0]">
            {["All NCCS", "A1", "A2", "B1", "B2", "C", "D", "E"].map((nccs) => (
              <DropdownMenuItem
                key={nccs}
                onClick={() => updateFilter("nccs", nccs)}
                className="text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                {nccs}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2 bg-white border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]">
              <User className="w-4 h-4" />
              <span>{filters.gender}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-[#E2E8F0]">
            {["All Genders", "Male", "Female"].map((gender) => (
              <DropdownMenuItem
                key={gender}
                onClick={() => updateFilter("gender", gender)}
                className="text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                {gender}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2 bg-white border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]">
              <Baby className="w-4 h-4" />
              <span>{filters.ageGroup}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-[#E2E8F0]">
            {["All Ages", "13-17", "18-24", "25-34", "35-44", "45-54", "55+"].map((ageGroup) => (
              <DropdownMenuItem
                key={ageGroup}
                onClick={() => updateFilter("ageGroup", ageGroup)}
                className="text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                {ageGroup}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UniversalFilterBar;
