
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ArrowRight, CheckCircle, Info, Users, Clock, Target, Activity, Award } from "lucide-react";

interface AIConfirmationDialogProps {
  formData: {
    drillName: string;
    duration: string;
    ageGroup: string;
    trainingFocus: string;
    playerCount: string;
    physicalIntensity: string;
    notes: string;
    trainingStyle: string;
    drillDiagram: File | null;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading: boolean;
}

export function AIConfirmationDialog({
  formData,
  open,
  onOpenChange,
  onConfirm,
  loading,
}: AIConfirmationDialogProps) {
  if (!formData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <CheckCircle className="text-green-500 h-6 w-6" />
            Confirm AI Training Plan Generation
          </DialogTitle>
          <DialogDescription>
            Review your selections before generating an AI training plan
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-3 border rounded-lg p-4 bg-muted/30">
            <h3 className="font-medium flex items-center gap-2 text-primary">
              <Info className="h-4 w-4" />
              Training Session Details
            </h3>
            <ul className="text-sm space-y-2.5 pl-2">
              <li className="flex items-start gap-2">
                <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Drill Name:</span> {formData.drillName}
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Duration:</span> {formData.duration} minutes
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Users className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Age Group:</span> {formData.ageGroup}
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Training Focus:</span> {formData.trainingFocus}
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Users className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Player Count:</span> {formData.playerCount}
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Activity className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Physical Intensity:</span> {formData.physicalIntensity}
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Award className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Training Style:</span> {formData.trainingStyle}
                </div>
              </li>
            </ul>
          </div>
          
          <div className="space-y-2 border rounded-lg p-4 bg-primary/10">
            <h3 className="font-medium flex items-center gap-2 text-primary">
              <CheckCircle className="h-4 w-4" />
              AI Will Generate
            </h3>
            <p className="text-sm">
              An AI-powered training plan focused on <span className="font-medium">{formData.trainingFocus}</span> with a <span className="font-medium">{formData.trainingStyle}</span> approach, 
              suitable for <span className="font-medium">{formData.ageGroup}</span> players at <span className="font-medium">{formData.physicalIntensity}</span> intensity level, 
              lasting <span className="font-medium">{formData.duration} minutes</span>.
            </p>
          </div>

          {loading && (
            <div className="animate-pulse space-y-2 border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20">
              <h3 className="font-medium flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                AI Processing
              </h3>
              <div className="h-2 bg-blue-200 dark:bg-blue-800/50 rounded w-full max-w-[80%]"></div>
              <div className="h-2 bg-blue-200 dark:bg-blue-800/50 rounded w-full max-w-[60%]"></div>
              <div className="h-2 bg-blue-200 dark:bg-blue-800/50 rounded w-full max-w-[70%]"></div>
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-row justify-between sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Edit Selections
          </Button>
          <Button 
            type="button" 
            onClick={onConfirm}
            disabled={loading}
            className="gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Generate Plan
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
