
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useState } from "react";
import { ReactNode } from "react";

export interface RankedItem {
  rank: number;
  label: string;
  subtitle?: string;
  metric: string;
  change?: number;
  logo?: string; // Optional logo URL
}

interface RankedListProps {
  title: string | ReactNode;
  data: RankedItem[];
  onItemClick?: (item: RankedItem) => void;
}

const RankedList = ({ title, data, onItemClick }: RankedListProps) => {
  const [itemsToShow, setItemsToShow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsToShow);
  const startIndex = (currentPage - 1) * itemsToShow;
  const endIndex = startIndex + itemsToShow;
  const currentItems = data.slice(startIndex, endIndex);

  const handleItemsToShowChange = (value: string) => {
    setItemsToShow(parseInt(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getAppIcon = (item: RankedItem) => {
    if (item.logo) {
      return (
        <img
          src={item.logo}
          alt={item.label}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            // Fallback to first character if image fails to load
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
      );
    }

    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#3F5BF6] to-[#F43F5E] flex items-center justify-center text-white text-sm font-bold">
        {item.label.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <Card className="bg-white border border-[#E2E8F0] shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-[#0F172A]">{title}</CardTitle>
          <Select value={itemsToShow.toString()} onValueChange={handleItemsToShowChange}>
            <SelectTrigger className="w-20 bg-white border-[#E2E8F0] text-[#0F172A]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#E2E8F0] text-[#0F172A]">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {currentItems.map((item) => (
          <div
            key={item.rank}
            onClick={() => onItemClick?.(item)}
            className="flex items-center justify-between p-3 rounded-lg bg-[#F8FAFC] hover:bg-[#3F5BF6]/5 transition-colors cursor-pointer border border-[#E2E8F0]"
          >
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#3F5BF6] to-[#F43F5E] flex items-center justify-center text-white text-xs font-bold">
                {item.rank}
              </div>
              <div className="relative">
                {getAppIcon(item)}
                {item.logo && (
                  <div className="hidden w-8 h-8 rounded-full bg-gradient-to-r from-[#3F5BF6] to-[#F43F5E] flex items-center justify-center text-white text-sm font-bold">
                    {item.label.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className="text-[#0F172A] font-medium capitalize">{item.label}</p>
                {item.subtitle && (
                  <p className="text-xs text-[#64748B]">{item.subtitle}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#0F172A] font-semibold">{item.metric}</p>
              {item.change !== undefined && (
                <p className={`text-xs ${item.change > 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                  {item.change > 0 ? '+' : ''}{item.change}%
                </p>
              )}
            </div>
          </div>
        ))}

        {totalPages > 1 && (
          <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
            <Pagination>
              <PaginationContent className="text-[#0F172A]">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={`text-[#0F172A] hover:bg-[#3F5BF6]/10 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                        className={`text-[#0F172A] hover:bg-[#3F5BF6]/10 cursor-pointer ${currentPage === page ? 'bg-[#3F5BF6]/20' : ''
                          }`}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={`text-[#0F172A] hover:bg-[#3F5BF6]/10 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RankedList;
