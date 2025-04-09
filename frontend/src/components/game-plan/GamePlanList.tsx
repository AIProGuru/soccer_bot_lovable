
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuery } from '@tanstack/react-query';
import { loadGamePlans, type GamePlan } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export const GamePlanList = ({ onSelect }: { onSelect?: (plan: GamePlan) => void }) => {
  const [open, setOpen] = useState(false);
  const { data: gamePlans, isLoading } = useQuery({
    queryKey: ['game-plans'],
    queryFn: loadGamePlans,
  });

  const handleSelectPlan = (plan: GamePlan) => {
    if (onSelect) {
      onSelect(plan);
    }
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full bg-coaching-700 text-coaching-50 border-coaching-600 hover:bg-coaching-600">
            Load Game Plan
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl bg-coaching-800 border-coaching-700">
          <DialogHeader>
            <DialogTitle className="text-coaching-50">Saved Game Plans</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[400px] rounded-md border border-coaching-700 p-4">
            {isLoading ? (
              <p className="text-coaching-50">Loading...</p>
            ) : (
              <div className="space-y-4">
                {gamePlans?.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-4 rounded-lg bg-coaching-700 hover:bg-coaching-600 cursor-pointer"
                    onClick={() => handleSelectPlan(plan)}
                  >
                    <h3 className="font-semibold text-coaching-50">
                      vs {plan.match_details.opponentTeam}
                    </h3>
                    <div className="text-sm text-coaching-200">
                      <p>Date: {format(new Date(plan.match_details.date), 'PP')}</p>
                      <p>Formation: {plan.team_analysis.formation}</p>
                      <p>Style: {plan.team_analysis.playStyle}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};
