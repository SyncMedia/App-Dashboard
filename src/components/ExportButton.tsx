
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExportButtonProps {
  onExport?: (format: string) => void;
}

const ExportButton = ({ onExport }: ExportButtonProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-gradient-to-r from-[#32F594] to-[#38BDF8] text-black hover:opacity-90 shadow-lg rounded-full w-12 h-12 p-0">
            <Download className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#1A1F2E] border border-[#32F594]/20 mb-2">
          <DropdownMenuItem 
            onClick={() => onExport?.("pdf")}
            className="text-white hover:bg-[#32F594]/10"
          >
            Export as PDF
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onExport?.("csv")}
            className="text-white hover:bg-[#32F594]/10"
          >
            Export as CSV
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ExportButton;
