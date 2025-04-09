
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Clock, MapPin, Trophy, Swords } from "lucide-react";

interface MatchDetailsProps {
  matchDetails: {
    opponentTeam: string;
    date: string;
    time: string;
    competition: string;
    venue: string;
    saveReport?: boolean;
  };
  onMatchDetailsChange: (field: string, value: string | boolean) => void;
}

export const MatchDetailsForm = ({
  matchDetails,
  onMatchDetailsChange,
}: MatchDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-coaching-50 flex items-center">
          ⚔️ Scouting Your Next Battle
        </h3>
        <p className="text-sm text-coaching-400 mt-1">
          Input match info so AI can tailor your tactical edge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Opponent Section */}
        <Card className="bg-coaching-800 border-coaching-700 shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center mb-3 text-coaching-50">
              <Swords className="mr-2 h-5 w-5 text-coaching-400" />
              <Label className="font-semibold">🆚 Opponent</Label>
            </div>
            <Input
              className="bg-coaching-700 border-coaching-600 text-coaching-50 placeholder:text-coaching-400"
              value={matchDetails.opponentTeam}
              onChange={(e) => onMatchDetailsChange('opponentTeam', e.target.value)}
              placeholder="Enter opponent team name"
            />
          </CardContent>
        </Card>

        {/* Competition Type Section */}
        <Card className="bg-coaching-800 border-coaching-700 shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center mb-3 text-coaching-50">
              <Trophy className="mr-2 h-5 w-5 text-coaching-400" />
              <Label className="font-semibold">🏆 Competition</Label>
            </div>
            <Select
              onValueChange={(value) => onMatchDetailsChange('competition', value)}
              value={matchDetails.competition}
            >
              <SelectTrigger className="bg-coaching-700 border-coaching-600 text-coaching-50">
                <SelectValue placeholder="Select competition type" />
              </SelectTrigger>
              <SelectContent className="bg-coaching-800 border-coaching-700">
                <SelectItem value="league" className="text-coaching-50">League Match</SelectItem>
                <SelectItem value="cup" className="text-coaching-50">Cup Match</SelectItem>
                <SelectItem value="friendly" className="text-coaching-50">Friendly</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Date & Time Section */}
        <Card className="bg-coaching-800 border-coaching-700 shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center mb-3 text-coaching-50">
              <CalendarIcon className="mr-2 h-5 w-5 text-coaching-400" />
              <Label className="font-semibold">📅 Date & Time</Label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-coaching-400" />
                  <Label className="text-sm text-coaching-200">Date</Label>
                </div>
                <Input
                  type="date"
                  className="bg-coaching-700 border-coaching-600 text-coaching-50"
                  value={matchDetails.date}
                  onChange={(e) => onMatchDetailsChange('date', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-coaching-400" />
                  <Label className="text-sm text-coaching-200">Time</Label>
                </div>
                <Input
                  type="time"
                  className="bg-coaching-700 border-coaching-600 text-coaching-50"
                  value={matchDetails.time}
                  onChange={(e) => onMatchDetailsChange('time', e.target.value)}
                  min="00:00"
                  max="23:59"
                  step="60"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Venue Section */}
        <Card className="bg-coaching-800 border-coaching-700 shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center mb-3 text-coaching-50">
              <MapPin className="mr-2 h-5 w-5 text-coaching-400" />
              <Label className="font-semibold">🏟️ Venue</Label>
            </div>
            <Input
              className="bg-coaching-700 border-coaching-600 text-coaching-50 placeholder:text-coaching-400"
              value={matchDetails.venue}
              onChange={(e) => onMatchDetailsChange('venue', e.target.value)}
              placeholder="Enter venue location"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-coaching-800/60 border-coaching-700 mt-4">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="save-report"
              checked={matchDetails.saveReport || false}
              onCheckedChange={(checked) => onMatchDetailsChange('saveReport', checked)}
              className="data-[state=checked]:bg-coaching-500"
            />
            <Label htmlFor="save-report" className="text-coaching-50">
              Save report for future reference
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
