
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import { FormDataType } from "../FormTypes";
import { durationPresets, durationColors } from "../constants";

interface TimingSectionProps {
  formData: FormDataType;
  onChange: (data: Partial<FormDataType>) => void;
}

export const TimingSection = ({ formData, onChange }: TimingSectionProps) => {
  
  const getDurationColor = (duration: string) => {
    const durationNumber = parseInt(duration);
    if (durationNumber <= 15) return durationColors["15"];
    if (durationNumber <= 30) return durationColors["30"];
    if (durationNumber <= 45) return durationColors["45"];
    if (durationNumber <= 60) return durationColors["60"];
    if (durationNumber <= 90) return durationColors["90"];
    return durationColors["120"];
  };

  const getDurationSliderValue = (duration: string): number => {
    return Math.min(120, Math.max(0, parseInt(duration) || 0));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-coaching-50">Timing</h3>
      <Separator className="bg-coaching-700" />
      
      <div className="space-y-3">
        <Label htmlFor="duration" className="text-coaching-50 font-medium text-base">Duration (minutes)</Label>
        
        <div className="flex gap-2 flex-wrap">
          {durationPresets.map((preset) => (
            <Badge 
              key={preset.value}
              variant="outline"
              className={`cursor-pointer flex items-center gap-1 ${formData.duration === preset.value ? durationColors[preset.value as keyof typeof durationColors] : 'bg-coaching-700/50 border-coaching-600 text-coaching-300'}`}
              onClick={() => onChange({ duration: preset.value })}
            >
              <span>{preset.icon}</span>
              <span>{preset.label}</span>
            </Badge>
          ))}
          
          <div className="flex items-center ml-2">
            <Badge 
              variant="outline"
              className={`cursor-pointer flex items-center gap-1 ${!durationPresets.find(p => p.value === formData.duration) ? getDurationColor(formData.duration) : 'bg-coaching-700/50 border-coaching-600 text-coaching-300'}`}
            >
              <Clock className="h-3 w-3" />
              <Input
                id="duration"
                type="number"
                min="0"
                max="120"
                className="w-16 h-6 p-1 bg-transparent border-0 text-center focus:outline-none focus:ring-0"
                value={formData.duration}
                onChange={(e) => {
                  const value = e.target.value;
                  const parsed = parseInt(value);
                  if (isNaN(parsed)) {
                    onChange({ duration: "0" });
                  } else {
                    const clamped = Math.min(120, Math.max(0, parsed));
                    onChange({ duration: clamped.toString() });
                  }
                }}
              />
              <span className="text-xs">min</span>
            </Badge>
          </div>
        </div>
        
        <div className="pt-2">
          <Slider
            value={[getDurationSliderValue(formData.duration)]}
            max={120}
            min={0}
            step={5}
            onValueChange={(value) => {
              onChange({ duration: value[0].toString() });
            }}
            className="bg-coaching-700"
          />
          <div className="flex justify-between text-xs text-coaching-400 mt-1">
            <span>0m</span>
            <span>15m</span>
            <span>30m</span>
            <span>45m</span>
            <span>60m</span>
            <span>90m</span>
            <span>120m</span>
          </div>
        </div>
      </div>
    </div>
  );
};
