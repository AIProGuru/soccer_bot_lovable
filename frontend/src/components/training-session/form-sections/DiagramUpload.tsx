
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FormDataType } from "../FormTypes";

interface DiagramUploadProps {
  onChange: (data: Partial<FormDataType>) => void;
}

export const DiagramUpload = ({ onChange }: DiagramUploadProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-coaching-50">Tactical Visuals</h3>
      <Separator className="bg-coaching-700" />
      
      <div className="space-y-3">
        <Label htmlFor="drillDiagram" className="text-coaching-50 font-medium text-base">Drill Diagram</Label>
        <Input
          id="drillDiagram"
          type="file"
          accept="image/*"
          className="bg-coaching-700/90 border border-coaching-600 text-coaching-50"
          onChange={(e) => onChange({ drillDiagram: e.target.files?.[0] || null })}
        />
      </div>
    </div>
  );
};
