
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { FormDataType } from "../FormTypes";

interface FormButtonsProps {
  formData: FormDataType;
  onSubmit: (formData: FormDataType) => void;
  onGenerateAI: (formData: FormDataType) => void;
  loading: boolean;
  generatingPlan: boolean;
}

export const FormButtons = ({ 
  formData, 
  onSubmit, 
  onGenerateAI, 
  loading, 
  generatingPlan 
}: FormButtonsProps) => {
  
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAIGenerate = (e: React.MouseEvent) => {
    e.preventDefault();
    onGenerateAI(formData);
  };

  return (
    <div className="flex gap-4 pt-5">
      <Button 
        type="button"
        onClick={handleAIGenerate}
        disabled={loading || generatingPlan}
        variant="outline"
        className="border-coaching-600 bg-coaching-600 text-coaching-50 hover:bg-coaching-700/50 font-medium"
      >
        <Wand2 className="mr-2" />
        {generatingPlan ? "Generating..." : "Generate with AI"}
      </Button>
      <Button 
        type="submit"
        disabled={loading || generatingPlan}
        className="bg-coaching-600 text-coaching-50 hover:bg-coaching-700 font-medium shadow-sm"
        onClick={handleSubmit}
      >
        {loading ? "Saving..." : "Save Session"}
      </Button>
    </div>
  );
};
