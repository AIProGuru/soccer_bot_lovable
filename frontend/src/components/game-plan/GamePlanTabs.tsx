import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchDetailsForm } from "./MatchDetailsForm";
import { TacticsForm } from "./TacticsForm";
import { TacticalGuidelines } from "./TacticalGuidelines";
import { type MatchDetails, type Tactics } from "./hooks/useGamePlanState";
import { ResponseLengthToggle } from "../shared/ResponseLengthToggle";

interface GamePlanTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  matchDetails: MatchDetails;
  onMatchDetailsChange: (field: string, value: string | boolean) => void;
  tactics: Tactics;
  onTacticsChange: (field: string, value: string) => void;
}

export const GamePlanTabs: React.FC<GamePlanTabsProps> = ({
  activeTab,
  onTabChange,
  matchDetails,
  onMatchDetailsChange,
  tactics,
  onTacticsChange,
}) => {
  const [detailedResponse, setDetailedResponse] = useState(false);
  return (
    <div>
      <ResponseLengthToggle
        isDetailed={detailedResponse}
        onToggle={setDetailedResponse}
      />
      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-coaching-700">
          <TabsTrigger
            value="match-details"
            className="data-[state=active]:bg-coaching-600"
          >
            Match Details
          </TabsTrigger>
          <TabsTrigger
            value="tactics"
            className="data-[state=active]:bg-coaching-600"
          >
            Tactics
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="match-details"
          className="bg-coaching-800 p-4 rounded-md border border-coaching-700"
        >
          <MatchDetailsForm
            matchDetails={matchDetails}
            onMatchDetailsChange={onMatchDetailsChange}
          />
        </TabsContent>

        <TabsContent
          value="tactics"
          className="bg-coaching-800 p-4 rounded-md border border-coaching-700"
        >
          <TacticsForm tactics={tactics} onTacticsChange={onTacticsChange} />

          {/* Tactical Guidelines Component */}
          {(tactics.formation || tactics.playStyle) && (
            <TacticalGuidelines
              formation={tactics.formation}
              playStyle={tactics.playStyle}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
