
import { useState, useEffect } from "react";
import { type FormDataType, type TrainingSessionFormProps } from "./FormTypes";
import { TemplatesSelector } from "./form-sections/TemplatesSelector";
import { FavoriteToggle } from "./form-sections/FavoriteToggle";
import { SessionOverview } from "./form-sections/SessionOverview";
import { MatchContext } from "./form-sections/MatchContext";
import { TimingSection } from "./form-sections/TimingSection";
import { DiagramUpload } from "./form-sections/DiagramUpload";
import { FormButtons } from "./form-sections/FormButtons";
import { ageFocusSuggestions, drillNameSuggestions, noteTemplates } from "./constants";
import { type SessionTemplate } from "./templates";
import { getTagsByTrainingStyle } from "./constants/tagConstants";

export const TrainingSessionForm = ({ 
  onSubmit, 
  onGenerateAI, 
  loading, 
  generatingPlan 
}: TrainingSessionFormProps) => {
  const [formData, setFormData] = useState<FormDataType>({
    drillName: "",
    duration: "30",
    ageGroup: "",
    trainingFocus: "",
    playerCount: "10",
    physicalIntensity: "medium",
    notes: "",
    drillDiagram: null,
    trainingStyle: "",
    isFavorite: false,
    tags: [],
  });

  const [suggestedDrillNames, setSuggestedDrillNames] = useState<string[]>([]);
  const [suggestedNotes, setSuggestedNotes] = useState<string[]>([]);
  const [filteredTrainingStyles, setFilteredTrainingStyles] = useState<string[]>([]);

  useEffect(() => {
    if (formData.trainingStyle && drillNameSuggestions[formData.trainingStyle as keyof typeof drillNameSuggestions]) {
      setSuggestedDrillNames(drillNameSuggestions[formData.trainingStyle as keyof typeof drillNameSuggestions]);
    } else {
      setSuggestedDrillNames([]);
    }
    
    if (formData.trainingStyle && noteTemplates[formData.trainingStyle as keyof typeof noteTemplates]) {
      setSuggestedNotes(noteTemplates[formData.trainingStyle as keyof typeof noteTemplates]);
    } else {
      setSuggestedNotes([]);
    }
    
    // Auto-fill tags based on training style
    if (formData.trainingStyle) {
      const tags = getTagsByTrainingStyle(formData.trainingStyle);
      setFormData(prev => ({
        ...prev,
        tags
      }));
    }
  }, [formData.trainingStyle]);
  
  useEffect(() => {
    if (formData.ageGroup && ageFocusSuggestions[formData.ageGroup as keyof typeof ageFocusSuggestions]) {
      setFilteredTrainingStyles(ageFocusSuggestions[formData.ageGroup as keyof typeof ageFocusSuggestions]);
    } else {
      setFilteredTrainingStyles(Object.keys(drillNameSuggestions));
    }
  }, [formData.ageGroup]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toggleFavorite = () => {
    setFormData({ ...formData, isFavorite: !formData.isFavorite });
  };

  const handleFormDataChange = (updates: Partial<FormDataType>) => {
    // Apply the predefined tags based on training style
    if (updates.trainingStyle && updates.trainingStyle !== formData.trainingStyle) {
      updates.tags = getTagsByTrainingStyle(updates.trainingStyle);
    }
    
    setFormData(prevData => ({ ...prevData, ...updates }));
  };

  const applyTemplate = (template: SessionTemplate) => {
    // Create a new object with only the properties that exist in FormDataType
    const templateData: Partial<FormDataType> = {
      drillName: template.drillName,
      duration: template.duration,
      ageGroup: template.ageGroup,
      trainingFocus: template.trainingFocus,
      playerCount: template.playerCount,
      physicalIntensity: template.physicalIntensity,
      notes: template.notes,
      trainingStyle: template.trainingStyle,
      tags: template.tags,
      isFavorite: formData.isFavorite // Keep existing favorite status
    };
    
    // Apply predefined tags based on training style
    if (template.trainingStyle) {
      templateData.tags = getTagsByTrainingStyle(template.trainingStyle);
    }
    
    // Preserve the existing diagram
    if (formData.drillDiagram) {
      templateData.drillDiagram = formData.drillDiagram;
    }
    
    // Update the form data
    setFormData(prevData => ({ ...prevData, ...templateData }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2">
          <TemplatesSelector onApplyTemplate={applyTemplate} />
        </div>
        <div className="flex items-center gap-2">
          <FavoriteToggle 
            isFavorite={formData.isFavorite} 
            onToggle={toggleFavorite} 
          />
        </div>
      </div>

      <SessionOverview 
        formData={formData}
        onChange={handleFormDataChange}
        suggestedDrillNames={suggestedDrillNames}
        suggestedNotes={suggestedNotes}
        filteredTrainingStyles={filteredTrainingStyles}
      />

      <MatchContext 
        formData={formData}
        onChange={handleFormDataChange}
      />

      <TimingSection 
        formData={formData}
        onChange={handleFormDataChange}
      />

      <DiagramUpload 
        onChange={handleFormDataChange}
      />

      <FormButtons 
        formData={formData}
        onSubmit={onSubmit}
        onGenerateAI={onGenerateAI}
        loading={loading}
        generatingPlan={generatingPlan}
      />
    </form>
  );
};
