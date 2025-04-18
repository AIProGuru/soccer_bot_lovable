import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FileText, FileTextIcon } from "lucide-react";

interface ResponseLengthToggleProps {
  isDetailed: boolean;
  onToggle: (value: boolean) => void;
}

export const ResponseLengthToggle = ({
  isDetailed,
  onToggle,
}: ResponseLengthToggleProps) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <Switch
        id="response-length"
        checked={isDetailed}
        onCheckedChange={onToggle}
      />
      <Label
        htmlFor="response-length"
        className="flex items-center space-x-2 cursor-pointer"
      >
        {isDetailed ? (
          <FileText className="h-4 w-4 text-coaching-300" />
        ) : (
          <FileTextIcon className="h-4 w-4 text-coaching-300" />
        )}
        <span className="text-coaching-300">
          {isDetailed ? "Detailed Response" : "Concise Response"}
        </span>
      </Label>
    </div>
  );
};
