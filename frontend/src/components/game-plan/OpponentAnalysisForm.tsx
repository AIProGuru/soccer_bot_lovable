
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LightbulbIcon, PlusIcon, TagIcon, Star, Shield, Sword, Target, Info } from "lucide-react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface OpponentAnalysisFormProps {
  opponentAnalysis: {
    style: string;
    strengths: string;
    weaknesses: string;
  };
  onOpponentAnalysisChange: (field: string, value: string) => void;
}

// Tactical tags for different categories - Significantly expanded
const TACTICAL_TAGS = {
  strengths: [
    // Offensive Strengths
    "Strong in possession",
    "Fast counter-attacks",
    "Excellent set pieces",
    "Physical in duels",
    "Strong defensive organization",
    "Quick transitions",
    "Dangerous on the flanks",
    "Clinical finishing",
    "High pressing",
    "Creative midfield",
    "Aerial dominance",
    "Build-up play",
    "Positional rotations",
    "Quick combination play",
    "Effective high press",
    "Overloading the wings",
    "Tactical flexibility",
    "Dominant in midfield",
    "Penetrating through passes",
    "Strong at set-piece defense",
    "Effective low block",
    "Dangerous on corners",
    "Strong captain leadership",
    "Quick build-up play",
    "Effective in 1v1 situations",
    "Technical skill in tight spaces",
    "Fast attacking fullbacks",
    "Coordinated team movement",
    "Excellent crossing ability",
    "Strong team cohesion",
    "Effective high defensive line",
    "Expert at drawing fouls"
  ],
  weaknesses: [
    // Defensive Weaknesses
    "Vulnerable to pressing",
    "Slow defenders",
    "Poor in aerial duels",
    "Weak against counter-attacks",
    "Struggle with high balls",
    "Poor positional discipline",
    "Limited squad depth",
    "Easily frustrated",
    "Vulnerable to overlapping runs",
    "Weak at defending set pieces",
    "Poor transition defense",
    "Disorganized under pressure",
    "Inconsistent goalkeeper",
    "Space between defensive lines",
    "Lose shape when trailing",
    "Vulnerable at far post",
    "Poor marking on corners",
    "Defensive communication issues",
    "Poor at defending crosses",
    "Susceptible to long balls",
    "Weak defensive midfield cover",
    "Strikers don't track back",
    "Vulnerable to quick switches of play",
    "Poor recovery speed",
    "Concede late goals",
    "Vulnerable to balls in behind",
    "Over-commit to attacks",
    "Weak at defending cutbacks",
    "Struggle against physical opponents",
    "Indecisive in defensive transitions",
    "Vulnerable when pressed high",
    "Low defensive work rate"
  ]
};

const playStyleDescriptions = {
  possession: `
    <h4 class="font-bold">Possession-Based (Tiki-Taka Style)</h4>
    <p><span class="text-green-400">✅ Focus:</span> Ball retention, short passing patterns, patience</p>
    <p><span class="text-green-400">✅ Strengths:</span> Control of game tempo, technical skill, movement</p>
    <p><span class="text-green-400">✅ Weaknesses:</span> Can lack directness, vulnerable to fast counters</p>
    <p><span class="text-green-400">✅ Examples:</span> Barcelona, Manchester City, Spain</p>
  `,
  counter: `
    <h4 class="font-bold">Counter-Attacking</h4>
    <p><span class="text-green-400">✅ Focus:</span> Defend deep, quick transitions into attack</p>
    <p><span class="text-green-400">✅ Strengths:</span> Exploits open spaces, efficiency in attack</p>
    <p><span class="text-green-400">✅ Weaknesses:</span> Spend long periods defending, reliant on transitions</p>
    <p><span class="text-green-400">✅ Examples:</span> Leicester City 2015/16, Liverpool under Klopp, Real Madrid</p>
  `,
  direct: `
    <h4 class="font-bold">Direct Play</h4>
    <p><span class="text-green-400">✅ Focus:</span> Forward passes, minimal build-up, aerial threat</p>
    <p><span class="text-green-400">✅ Strengths:</span> Bypasses opposing midfield, creates immediate pressure</p>
    <p><span class="text-green-400">✅ Weaknesses:</span> Lower possession %, reliant on winning second balls</p>
    <p><span class="text-green-400">✅ Examples:</span> Burnley under Dyche, Atlético Madrid, England</p>
  `,
  pressing: `
    <h4 class="font-bold">High Pressing (Gegenpressing)</h4>
    <p><span class="text-green-400">✅ Focus:</span> Win ball high up pitch, intense pressure, suffocate opposition</p>
    <p><span class="text-green-400">✅ Strengths:</span> Forced turnovers in dangerous areas, psychological impact</p>
    <p><span class="text-green-400">✅ Weaknesses:</span> Physically demanding, vulnerable to teams that beat the press</p>
    <p><span class="text-green-400">✅ Examples:</span> Liverpool, RB Leipzig, Leeds United under Bielsa</p>
  `,
  mixed: `
    <h4 class="font-bold">Mixed Approach</h4>
    <p><span class="text-green-400">✅ Focus:</span> Tactical flexibility, adaptable to different match situations</p>
    <p><span class="text-green-400">✅ Strengths:</span> Unpredictable, can adjust based on opposition or game state</p>
    <p><span class="text-green-400">✅ Weaknesses:</span> May lack clear identity, players need high tactical IQ</p>
    <p><span class="text-green-400">✅ Examples:</span> Bayern Munich, Chelsea, France</p>
  `,
};

const strengthColors = {
  high: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
  medium: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
  low: "bg-sky-100 text-sky-800 border-sky-200 hover:bg-sky-200"
};

const weaknessColors = {
  high: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
  medium: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200",
  low: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200"
};

export const OpponentAnalysisForm = ({
  opponentAnalysis,
  onOpponentAnalysisChange,
}: OpponentAnalysisFormProps) => {
  const [activeField, setActiveField] = useState<'strengths' | 'weaknesses' | null>(null);
  const [strengthLevel, setStrengthLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [weaknessLevel, setWeaknessLevel] = useState<'low' | 'medium' | 'high'>('medium');

  const handleTagClick = (field: 'strengths' | 'weaknesses', tag: string) => {
    const currentValue = opponentAnalysis[field];
    
    // Check if tag is already in the field
    if (!currentValue.includes(tag)) {
      const newValue = currentValue ? `${currentValue}, ${tag}` : tag;
      onOpponentAnalysisChange(field, newValue);
    }
  };

  const handleSuggest = (field: 'strengths' | 'weaknesses') => {
    // Enhanced suggestion logic - provide multiple suggestions at once
    const suggestions = TACTICAL_TAGS[field];
    const currentValues = opponentAnalysis[field].split(',').map(v => v.trim()).filter(Boolean);
    
    // Get 3 random suggestions that aren't already in the field
    const availableSuggestions = suggestions.filter(s => !currentValues.includes(s));
    const numberOfSuggestions = Math.min(3, availableSuggestions.length);
    
    if (availableSuggestions.length === 0) {
      return; // All suggestions already used
    }
    
    // Add multiple suggestions at once
    const randomIndices = Array.from({length: numberOfSuggestions}, () => 
      Math.floor(Math.random() * availableSuggestions.length)
    );
    
    // Make sure we don't have duplicate indices
    const uniqueIndices = [...new Set(randomIndices)];
    
    const selectedSuggestions = uniqueIndices.map(i => availableSuggestions[i]);
    
    // Add all selected suggestions to the field
    const newValue = currentValues.length > 0 
      ? `${opponentAnalysis[field]}, ${selectedSuggestions.join(', ')}` 
      : selectedSuggestions.join(', ');
    
    onOpponentAnalysisChange(field, newValue);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-coaching-50">Opponent Playing Style</h3>
        <Separator className="bg-coaching-700" />
        
        <div className="space-y-3">
          <Label className="text-coaching-50 font-medium flex items-center gap-2">
            <Info className="h-4 w-4 text-coaching-300" />
            Playing Style
          </Label>
          <Select
            onValueChange={(value) => onOpponentAnalysisChange('style', value)}
            value={opponentAnalysis.style}
          >
            <SelectTrigger className="bg-coaching-700 border-coaching-600 text-coaching-50">
              <SelectValue placeholder="Select playing style" />
            </SelectTrigger>
            <SelectContent className="bg-coaching-800 border-coaching-700">
              {Object.keys(playStyleDescriptions).map((style) => (
                <SelectItem 
                  key={style} 
                  value={style} 
                  description={playStyleDescriptions[style as keyof typeof playStyleDescriptions]} 
                  className="text-coaching-50"
                >
                  {style === "possession" ? "Possession-based" :
                   style === "counter" ? "Counter-attacking" :
                   style === "direct" ? "Direct Play" :
                   style === "pressing" ? "High Pressing" :
                   style === "mixed" ? "Mixed approach" : style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-1 space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LightbulbIcon className="h-4 w-4 text-coaching-300" />
            <span className="text-sm text-coaching-200 font-medium">Select tactical traits to add to your notes</span>
          </div>
        </div>
        
        <div className="space-y-2">
          {activeField === 'strengths' && (
            <div className="flex flex-wrap gap-2 mb-2">
              {TACTICAL_TAGS.strengths.map((tag) => (
                <Badge
                  key={tag}
                  onClick={() => handleTagClick('strengths', tag)}
                  className="cursor-pointer bg-coaching-700 text-coaching-200 hover:bg-coaching-600 hover:text-coaching-50 transition-colors"
                >
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {activeField === 'weaknesses' && (
            <div className="flex flex-wrap gap-2 mb-2">
              {TACTICAL_TAGS.weaknesses.map((tag) => (
                <Badge
                  key={tag}
                  onClick={() => handleTagClick('weaknesses', tag)}
                  className="cursor-pointer bg-coaching-700 text-coaching-200 hover:bg-coaching-600 hover:text-coaching-50 transition-colors"
                >
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-coaching-50">Opponent Analysis</h3>
        <Separator className="bg-coaching-700" />
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-coaching-50 font-medium flex items-center gap-2">
              <Sword className="h-4 w-4 text-coaching-300" />
              Key Strengths
            </Label>
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                {['low', 'medium', 'high'].map((level) => (
                  <Badge 
                    key={level}
                    variant="outline"
                    className={`cursor-pointer flex items-center gap-1 capitalize ${strengthLevel === level ? strengthColors[level as keyof typeof strengthColors] : 'bg-coaching-700/50 border-coaching-600 text-coaching-300'}`}
                    onClick={() => setStrengthLevel(level as 'low' | 'medium' | 'high')}
                  >
                    <span>{level}</span>
                  </Badge>
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-coaching-300 hover:text-coaching-50 hover:bg-coaching-700"
                onClick={() => handleSuggest('strengths')}
              >
                <LightbulbIcon className="h-3.5 w-3.5 mr-1" />
                Suggest (3)
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2 items-center">
            <Textarea
              className="bg-coaching-700 border-coaching-600 text-coaching-50 min-h-[60px] shadow-sm"
              placeholder="Add opponent strengths..."
              value={opponentAnalysis.strengths}
              onChange={(e) => onOpponentAnalysisChange('strengths', e.target.value)}
              onFocus={() => setActiveField('strengths')}
            />
          </div>
          
          <div className="pt-2">
            <Slider
              value={[
                strengthLevel === "low" ? 25 : 
                strengthLevel === "medium" ? 50 : 
                strengthLevel === "high" ? 75 : 50
              ]}
              max={100}
              step={25}
              onValueChange={(value) => {
                const level = 
                  value[0] <= 25 ? "low" : 
                  value[0] <= 50 ? "medium" : 
                  "high";
                setStrengthLevel(level as 'low' | 'medium' | 'high');
              }}
              className="bg-coaching-700"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-coaching-50 font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-coaching-300" />
              Weaknesses
            </Label>
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                {['low', 'medium', 'high'].map((level) => (
                  <Badge 
                    key={level}
                    variant="outline"
                    className={`cursor-pointer flex items-center gap-1 capitalize ${weaknessLevel === level ? weaknessColors[level as keyof typeof weaknessColors] : 'bg-coaching-700/50 border-coaching-600 text-coaching-300'}`}
                    onClick={() => setWeaknessLevel(level as 'low' | 'medium' | 'high')}
                  >
                    <span>{level}</span>
                  </Badge>
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-coaching-300 hover:text-coaching-50 hover:bg-coaching-700"
                onClick={() => handleSuggest('weaknesses')}
              >
                <LightbulbIcon className="h-3.5 w-3.5 mr-1" />
                Suggest (3)
              </Button>
            </div>
          </div>
          
          <Textarea
            className="bg-coaching-700 border-coaching-600 text-coaching-50 min-h-[60px] shadow-sm"
            placeholder="Add areas to exploit..."
            value={opponentAnalysis.weaknesses}
            onChange={(e) => onOpponentAnalysisChange('weaknesses', e.target.value)}
            onFocus={() => setActiveField('weaknesses')}
          />
          
          <div className="pt-2">
            <Slider
              value={[
                weaknessLevel === "low" ? 25 : 
                weaknessLevel === "medium" ? 50 : 
                weaknessLevel === "high" ? 75 : 50
              ]}
              max={100}
              step={25}
              onValueChange={(value) => {
                const level = 
                  value[0] <= 25 ? "low" : 
                  value[0] <= 50 ? "medium" : 
                  "high";
                setWeaknessLevel(level as 'low' | 'medium' | 'high');
              }}
              className="bg-coaching-700"
            />
          </div>
          
          <div className="mt-4 flex items-center p-2 rounded-md bg-coaching-700/50 border border-coaching-600 text-coaching-300 text-sm">
            <Target className="h-4 w-4 mr-2 text-coaching-400" />
            <span>Use the sliders to indicate how significant these strengths/weaknesses are for your match planning</span>
          </div>
        </div>
      </div>
    </div>
  );
};
