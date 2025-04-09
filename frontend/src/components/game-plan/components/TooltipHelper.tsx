
import React from "react";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipHelperProps {
  title: string;
  description: string;
}

export const TooltipHelper: React.FC<TooltipHelperProps> = ({
  title,
  description,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="h-4 w-4 text-coaching-400 cursor-help" />
        </TooltipTrigger>
        <TooltipContent
          side="right"
          align="start"
          className="max-w-[350px] p-4 bg-coaching-800 border-coaching-700 text-coaching-100"
        >
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold text-coaching-50">{title}</h4>
            <p>{description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
