
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Users } from "lucide-react";
import { FormDataType } from "../FormTypes";
import { 
  intensityColors, 
  intensityEmojis, 
  playerCountPresets, 
  playerCountColors 
} from "../constants";

interface MatchContextProps {
  formData: FormDataType;
  onChange: (data: Partial<FormDataType>) => void;
}

export const MatchContext = ({ formData, onChange }: MatchContextProps) => {
  
  const getPlayerCountColor = (count: string) => {
    const countNumber = parseInt(count);
    if (countNumber <= 5) return playerCountColors["5"];
    if (countNumber <= 10) return playerCountColors["10"];
    if (countNumber <= 15) return playerCountColors["15"];
    if (countNumber <= 20) return playerCountColors["20"];
    return playerCountColors["25"];
  };

  const getPlayerCountSliderValue = (count: string): number => {
    return Math.min(30, Math.max(1, parseInt(count) || 0));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-coaching-50">Match Context</h3>
      <Separator className="bg-coaching-700" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-3">
          <Label htmlFor="ageGroup" className="text-coaching-50 font-medium text-base">Age Group</Label>
          <Select 
            value={formData.ageGroup}
            onValueChange={(value) => onChange({ ageGroup: value })}
          >
            <SelectTrigger className="bg-coaching-700/90 border border-coaching-600 text-coaching-50 shadow-sm">
              <SelectValue placeholder="Select age group" />
            </SelectTrigger>
            <SelectContent className="bg-coaching-800 border-coaching-700">
              <SelectItem value="u12" className="text-coaching-50">Under 12</SelectItem>
              <SelectItem value="u14" className="text-coaching-50">Under 14</SelectItem>
              <SelectItem value="u16" className="text-coaching-50">Under 16</SelectItem>
              <SelectItem value="u18" className="text-coaching-50">Under 18</SelectItem>
              <SelectItem value="senior" className="text-coaching-50">Senior</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="playerCount" className="text-coaching-50 font-medium text-base">Number of Players</Label>
          
          <div className="flex gap-2 flex-wrap">
            {playerCountPresets.map((preset) => (
              <Badge 
                key={preset.value}
                variant="outline"
                className={`cursor-pointer flex items-center gap-1 ${formData.playerCount === preset.value ? playerCountColors[preset.value as keyof typeof playerCountColors] : 'bg-coaching-700/50 border-coaching-600 text-coaching-300'}`}
                onClick={() => onChange({ playerCount: preset.value })}
              >
                <span>{preset.icon}</span>
                <span>{preset.label}</span>
              </Badge>
            ))}
            
            <div className="flex items-center ml-2">
              <Badge 
                variant="outline"
                className={`cursor-pointer flex items-center gap-1 ${!playerCountPresets.find(p => p.value === formData.playerCount) ? getPlayerCountColor(formData.playerCount) : 'bg-coaching-700/50 border-coaching-600 text-coaching-300'}`}
              >
                <Users className="h-3 w-3" />
                <Input
                  id="playerCount"
                  type="number"
                  min="1"
                  max="30"
                  className="w-16 h-6 p-1 bg-transparent border-0 text-center focus:outline-none focus:ring-0"
                  value={formData.playerCount}
                  onChange={(e) => {
                    const value = e.target.value;
                    const parsed = parseInt(value);
                    if (isNaN(parsed)) {
                      onChange({ playerCount: "1" });
                    } else {
                      const clamped = Math.min(30, Math.max(1, parsed));
                      onChange({ playerCount: clamped.toString() });
                    }
                  }}
                />
                <span className="text-xs">players</span>
              </Badge>
            </div>
          </div>
          
          <div className="pt-2">
            <Slider
              value={[getPlayerCountSliderValue(formData.playerCount)]}
              max={30}
              min={1}
              step={1}
              onValueChange={(value) => {
                onChange({ playerCount: value[0].toString() });
              }}
              className="bg-coaching-700"
            />
            <div className="flex justify-between text-xs text-coaching-400 mt-1">
              <span>1</span>
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
              <span>25</span>
              <span>30</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-coaching-50 font-medium text-base">Physical Intensity</Label>
          <div className="flex gap-2">
            {["low", "medium", "high"].map((intensity) => (
              <Badge 
                key={intensity}
                variant="outline"
                className={`cursor-pointer flex items-center gap-1 capitalize ${formData.physicalIntensity === intensity ? intensityColors[intensity as keyof typeof intensityColors] : 'bg-coaching-700/50 border-coaching-600 text-coaching-300'}`}
                onClick={() => onChange({ physicalIntensity: intensity })}
              >
                <span>{intensityEmojis[intensity as keyof typeof intensityEmojis]}</span>
                <span>{intensity}</span>
              </Badge>
            ))}
          </div>
          
          <div className="pt-2">
            <Slider
              value={[
                formData.physicalIntensity === "low" ? 25 : 
                formData.physicalIntensity === "medium" ? 50 : 
                formData.physicalIntensity === "high" ? 75 : 50
              ]}
              max={100}
              step={25}
              onValueChange={(value) => {
                const intensity = 
                  value[0] <= 25 ? "low" : 
                  value[0] <= 50 ? "medium" : 
                  "high";
                onChange({ physicalIntensity: intensity });
              }}
              className="bg-coaching-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
