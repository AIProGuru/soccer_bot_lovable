
export interface FormDataType {
  drillName: string;
  duration: string;
  ageGroup: string;
  trainingFocus: string;
  playerCount: string;
  physicalIntensity: string;
  notes: string;
  drillDiagram: File | null;
  trainingStyle: string;
  isFavorite: boolean;
  tags: string[];
}

export interface TrainingSessionFormProps {
  onSubmit: (formData: FormDataType) => void;
  onGenerateAI: (formData: FormDataType) => void;
  loading: boolean;
  generatingPlan: boolean;
}
