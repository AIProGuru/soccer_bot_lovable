
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import { FormDataType } from "../FormTypes";
import { drillNameSuggestions, ageFocusSuggestions, trainingStyleDescriptions } from "../constants";
import { DrillNameSuggestions } from "../suggestions/DrillNameSuggestions";
import { NotesSuggestions } from "../suggestions/NotesSuggestions";
import { TagsSection } from "./TagsSection";

interface SessionOverviewProps {
  formData: FormDataType;
  onChange: (data: Partial<FormDataType>) => void;
  suggestedDrillNames: string[];
  suggestedNotes: string[];
  filteredTrainingStyles: string[];
}

export const SessionOverview = ({
  formData,
  onChange,
  suggestedDrillNames,
  suggestedNotes,
  filteredTrainingStyles,
}: SessionOverviewProps) => {
  
  const handleDrillNameSuggestionClick = (name: string) => {
    onChange({ drillName: name });
  };

  const handleNoteTemplateSuggestionClick = (note: string) => {
    onChange({ notes: formData.notes ? `${formData.notes}\n\n${note}` : note });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-coaching-50">Session Overview</h3>
      <Separator className="bg-coaching-700" />
      
      <div className="space-y-3">
        <Label htmlFor="drillName" className="text-coaching-50 font-medium text-base">Drill Name</Label>
        <Input
          id="drillName"
          placeholder="Enter drill name"
          className="bg-coaching-700/90 border border-coaching-600 text-coaching-50 placeholder:text-coaching-400/80 shadow-sm"
          value={formData.drillName}
          onChange={(e) => onChange({ drillName: e.target.value })}
        />
        
        <DrillNameSuggestions 
          suggestedDrillNames={suggestedDrillNames}
          onSuggestionClick={handleDrillNameSuggestionClick}
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="trainingStyle" className="text-coaching-50 font-medium text-base">Training Focus</Label>
        <Select 
          value={formData.trainingStyle}
          onValueChange={(value) => onChange({ trainingStyle: value })}
        >
          <SelectTrigger className="bg-coaching-700/90 border border-coaching-600 text-coaching-50 shadow-sm">
            <SelectValue placeholder="Select training focus" />
          </SelectTrigger>
          <SelectContent className="bg-coaching-800 border-coaching-700">
            {filteredTrainingStyles.map((style) => (
              <SelectItem 
                key={style} 
                value={style} 
                className="text-coaching-50"
              >
                {style === "possession" ? "Possession-based" :
                 style === "pressResistance" ? "Press-Resistance" :
                 style === "pressing" ? "High-pressing" :
                 style === "counter" ? "Counter-attacking" :
                 style === "vertical" ? "Verticality & Direct Play" :
                 style === "defensive" ? "Defensive Shape" :
                 style === "smallSided" ? "Small-Sided Games" :
                 style === "physical" ? "Physical Conditioning" :
                 style === "mental" ? "Mental Toughness" :
                 style === "wing" ? "Wing Play" :
                 style === "betweenLines" ? "Playing Between Lines" :
                 style === "oneVsOne" ? "1v1 Domination" :
                 style === "mixed" ? "Mixed approach" : style}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {formData.ageGroup && filteredTrainingStyles.length < Object.keys(trainingStyleDescriptions).length && (
          <div className="flex items-center gap-1 text-coaching-300 text-xs mt-1">
            <Info className="h-3 w-3" />
            <span>Showing age-appropriate training styles for {formData.ageGroup.toUpperCase()} players</span>
          </div>
        )}
      </div>

      <TagsSection 
        tags={formData.tags}
        onTagsChange={(tags) => onChange({ tags })}
      />

      <div className="space-y-3">
        <Label htmlFor="notes" className="text-coaching-50 font-medium text-base">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Enter session notes"
          className="bg-coaching-700/90 border border-coaching-600 text-coaching-50 placeholder:text-coaching-400/80 shadow-sm min-h-[100px]"
          value={formData.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
        />
        
        <NotesSuggestions 
          suggestedNotes={suggestedNotes}
          onSuggestionClick={handleNoteTemplateSuggestionClick}
        />
      </div>
    </div>
  );
};
