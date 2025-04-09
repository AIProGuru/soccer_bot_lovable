
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface GamePlanConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  matchDetails: {
    opponentTeam: string;
    date: string;
    time: string;
    competition: string;
    venue: string;
  };
  tactics: {
    formation: string;
    playStyle: string;
    focusArea: string;
    defensiveStrategy: string;
    offensiveStrategy: string;
    playerNotes: string;
  };
}

export const GamePlanConfirmationDialog: React.FC<GamePlanConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  matchDetails,
  tactics,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-coaching-800 border-coaching-700 text-coaching-50 max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-coaching-50">Generate Game Plan</AlertDialogTitle>
          <AlertDialogDescription className="text-coaching-200">
            Our elite AI coach (powered by GPT-4o) will analyze your input and generate a professional game plan tailored to your match against <span className="font-semibold text-coaching-100">{matchDetails.opponentTeam || 'your opponent'}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="my-4 p-4 bg-coaching-700/50 rounded-md">
          <h3 className="text-coaching-100 font-medium mb-2">Game Plan Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-coaching-300">Formation: <span className="text-coaching-50">{tactics.formation || 'Not specified'}</span></p>
              <p className="text-coaching-300">Play Style: <span className="text-coaching-50">{tactics.playStyle || 'Not specified'}</span></p>
              <p className="text-coaching-300">Focus Area: <span className="text-coaching-50">{tactics.focusArea || 'Not specified'}</span></p>
            </div>
            <div>
              <p className="text-coaching-300">Competition: <span className="text-coaching-50">{matchDetails.competition || 'Not specified'}</span></p>
              <p className="text-coaching-300">Venue: <span className="text-coaching-50">{matchDetails.venue || 'Not specified'}</span></p>
              <p className="text-coaching-300">Date: <span className="text-coaching-50">{matchDetails.date || 'Not specified'}</span></p>
            </div>
          </div>
        </div>
        
        <div className="mt-2 text-sm text-coaching-300">
          <p>This will use GPT-4o to generate a professional analysis and game plan. The process may take a few seconds.</p>
        </div>
        
        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel className="bg-coaching-700 text-coaching-50 border-coaching-600 hover:bg-coaching-600">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-coaching-600 text-coaching-50 hover:bg-coaching-500"
            onClick={onConfirm}
          >
            Generate with AI
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
