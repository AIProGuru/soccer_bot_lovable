
import { Button } from "@/components/ui/button";
import { Star, StarOff } from "lucide-react";

interface FavoriteToggleProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export const FavoriteToggle = ({ isFavorite, onToggle }: FavoriteToggleProps) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className="h-8 w-8 text-coaching-300 hover:text-coaching-50 hover:bg-coaching-700/50"
    >
      {isFavorite ? (
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ) : (
        <StarOff className="h-4 w-4" />
      )}
    </Button>
  );
};
