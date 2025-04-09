
import { Button } from "@/components/ui/button";
import { Share2Icon, FileDown, LightbulbIcon } from "lucide-react";

interface GamePlanActionsProps {
  loading: boolean;
  savedPlanId: string | null;
  onGenerateClick: () => void;
  onShareClick: () => void;
  onExportClick: () => void;
}

export const GamePlanActions = ({
  loading,
  savedPlanId,
  onGenerateClick,
  onShareClick,
  onExportClick,
}: GamePlanActionsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Button
          onClick={onGenerateClick}
          disabled={loading}
          className="w-full bg-coaching-700 hover:bg-coaching-600 text-coaching-50"
        >
          {loading ? "Generating..." : "Generate Game Plan"}
        </Button>
        
        <div className="flex items-start gap-2 text-sm text-coaching-300">
          <div className="mt-0.5">
            <LightbulbIcon className="h-4 w-4 text-coaching-400" />
          </div>
          <p>AI will analyze this matchup and generate custom tactics instantly.</p>
        </div>
      </div>

      {/* {savedPlanId && (
        <div className="space-y-4">
          <div className="bg-green-100 p-4 rounded-md">
            <p className="text-green-800 font-medium">✅ Game Plan Created Successfully!</p>
            <a
              href={`/game-plan/${savedPlanId}`}
              className="text-coaching-600 hover:underline text-sm"
            >
              View or Edit Plan
            </a>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onShareClick}
              variant="outline"
              className="flex-1"
            >
              <Share2Icon className="w-4 h-4 mr-2" />
              Share with Team
            </Button>
            <Button
              onClick={onExportClick}
              variant="outline"
              className="flex-1"
            >
              <FileDown className="w-4 h-4 mr-2" />
              Export to PDF
            </Button>
          </div>
        </div>
      )} */}
    </div>
  );
};
