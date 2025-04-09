
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { GamePlanActions } from "./GamePlanActions";
import { useNavigate } from "react-router-dom";

interface GamePlanNavigationProps {
  activeTab: string;
  loading: boolean;
  savedPlanId: string | null;
  onPreviousClick: () => void;
  onNextClick: () => void;
  onGenerateClick: () => void;
  onShareClick: () => void;
  onExportClick: () => void;
}

export const GamePlanNavigation: React.FC<GamePlanNavigationProps> = ({
  activeTab,
  loading,
  savedPlanId,
  onPreviousClick,
  onNextClick,
  onGenerateClick,
  onShareClick,
  onExportClick,
}) => {
  const navigate = useNavigate();

  // Updated to make sure we're just passing the function
  const handleGenerateClick = () => {
    onGenerateClick();
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="mt-6 flex justify-between items-center">
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onPreviousClick}
          disabled={activeTab === "match-details" || loading}
          className="bg-coaching-700 text-coaching-50 border-coaching-600 hover:bg-coaching-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <Button
          variant="outline"
          onClick={handleHomeClick}
          className="bg-coaching-700 text-coaching-50 border-coaching-600 hover:bg-coaching-600"
        >
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
      </div>
      
      <GamePlanActions 
        loading={loading}
        savedPlanId={savedPlanId}
        onGenerateClick={handleGenerateClick}
        onShareClick={onShareClick}
        onExportClick={onExportClick}
      />
      
      <Button
        variant="outline"
        onClick={onNextClick}
        disabled={activeTab === "tactics" || loading}
        className="bg-coaching-700 text-coaching-50 border-coaching-600 hover:bg-coaching-600"
      >
        Next
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
