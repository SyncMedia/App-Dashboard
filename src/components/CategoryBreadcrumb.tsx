
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface CategoryBreadcrumbProps {
  category: {
    name: string;
    subtitle?: string;
  };
}

const CategoryBreadcrumb = ({ category }: CategoryBreadcrumbProps) => {
  return (
    <Card className="bg-white border border-[#E2E8F0] shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-[#3F5BF6] to-[#38BDF8] rounded-lg flex items-center justify-center text-2xl">
            <div className="w-6 h-6 bg-white/20 rounded"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A] capitalize">{category.name}</h1>
            {category.subtitle && <p className="text-[#64748B]">{category.subtitle}</p>}

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryBreadcrumb;
