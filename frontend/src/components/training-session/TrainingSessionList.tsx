import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import {
  ChevronDown,
  ChevronUp,
  Tag,
  Clock,
  User,
  Star,
  StarOff,
  Plus,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import type { TrainingSession } from "@/lib/api/trainingSessions";
import ReactMarkdown from "react-markdown";

// Comprehensive list of common tags for training sessions
const commonTags = [
  // Session Types
  "Warm-Up",
  "Cool-Down",
  "Pre-Match",
  "Recovery",
  "Game Situation",

  // Technical Focus
  "Technical",
  "Passing",
  "Receiving",
  "Ball Control",
  "Dribbling",
  "Shooting",
  "Finishing",
  "Heading",
  "First Touch",

  // Tactical Areas
  "Tactical",
  "Possession",
  "Defensive",
  "Attacking",
  "Transition",
  "Set-Pieces",
  "Counter-Attack",
  "High Press",
  "Low Block",
  "Build-Up Play",
  "Final Third",
  "Positional Play",

  // Physical Aspects
  "Physical",
  "Speed",
  "Agility",
  "Endurance",
  "Strength",
  "Power",
  "Explosiveness",
  "Conditioning",
  "Interval",

  // Playing Formats
  "Small-Sided",
  "Rondo",
  "1v1",
  "2v2",
  "3v3",
  "4v4",
  "Overload",
  "11v11",

  // Position-Specific
  "Goalkeeper",
  "Defender",
  "Midfielder",
  "Winger",
  "Striker",
  "Full-Back",
  "Center-Back",

  // Mental Aspects
  "Decision-Making",
  "Communication",
  "Leadership",
  "Game Intelligence",
  "Concentration",

  // Specific Skills
  "Crossing",
  "Long Balls",
  "Through Balls",
  "Tackling",
  "Interception",
  "Pressing",
  "Combination Play",

  // Intensity/Format Labels
  "High Intensity",
  "Low Intensity",
  "Competition",
  "Fun",
  "Team Bonding",
  "Individual",
];

interface TrainingSessionListProps {
  sessions: TrainingSession[];
  onToggleFavorite?: (sessionId: number, isFavorite: boolean) => void;
  onUpdateTags?: (sessionId: number, tags: string[]) => void;
}

export const TrainingSessionList: React.FC<TrainingSessionListProps> = ({
  sessions,
  onToggleFavorite,
  onUpdateTags,
}) => {
  const [openSessionIds, setOpenSessionIds] = useState<number[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [editingTagsForId, setEditingTagsForId] = useState<number | null>(null);

  const toggleSession = (id: number) => {
    setOpenSessionIds((prev) =>
      prev.includes(id)
        ? prev.filter((sessionId) => sessionId !== id)
        : [...prev, id]
    );
  };

  const handleToggleFavorite = (
    sessionId: number,
    currentStatus: boolean | undefined
  ) => {
    if (onToggleFavorite) {
      onToggleFavorite(sessionId, !(currentStatus || false));
    }
  };

  const startEditingTags = (sessionId: number) => {
    setEditingTagsForId(sessionId);
    setTagInput("");
  };

  const addTag = (sessionId: number, tag: string, currentTags: string[]) => {
    if (onUpdateTags && tag && !currentTags.includes(tag)) {
      onUpdateTags(sessionId, [...currentTags, tag]);
    }
    setTagInput("");
  };

  const removeTag = (
    sessionId: number,
    tagToRemove: string,
    currentTags: string[]
  ) => {
    if (onUpdateTags) {
      onUpdateTags(
        sessionId,
        currentTags.filter((tag) => tag !== tagToRemove)
      );
    }
  };

  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 text-coaching-300">
        No training sessions found. Create your first session above.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => {
        const isOpen = openSessionIds.includes(session.id);
        const tags = JSON.parse(session.tags) || [];

        return (
          <Collapsible
            key={session.id}
            open={isOpen}
            onOpenChange={() => toggleSession(session.id)}
            className="border border-coaching-700 rounded-md bg-coaching-800/50 overflow-hidden"
          >
            <div className="flex justify-between items-center p-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {session.is_favorite && (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  )}
                  <h3 className="font-medium text-coaching-50">
                    {session.drill_name}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-1 text-xs text-coaching-300 mt-1">
                  <Badge
                    variant="outline"
                    className="bg-transparent text-coaching-300 border-coaching-700"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {session.duration} min
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-transparent text-coaching-300 border-coaching-700"
                  >
                    {session.age_group?.toUpperCase()}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-transparent text-coaching-300 border-coaching-700"
                  >
                    <User className="h-3 w-3 mr-1" />
                    {session.player_count}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`capitalize bg-transparent border-coaching-700 ${
                      session.physical_intensity === "low"
                        ? "text-green-400"
                        : session.physical_intensity === "medium"
                        ? "text-yellow-400"
                        : "text-orange-400"
                    }`}
                  >
                    {session.physical_intensity}
                  </Badge>
                </div>
              </div>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-coaching-300 hover:text-coaching-50 hover:bg-coaching-700/50"
                >
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <Separator className="bg-coaching-700" />
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium text-coaching-50">
                      Training Focus
                    </h4>
                    <p className="text-sm text-coaching-300">
                      {session.training_style === "possession"
                        ? "Possession-based"
                        : session.training_style === "pressResistance"
                        ? "Press-Resistance"
                        : session.training_style === "pressing"
                        ? "High-pressing"
                        : session.training_style === "counter"
                        ? "Counter-attacking"
                        : session.training_style === "vertical"
                        ? "Verticality & Direct Play"
                        : session.training_style === "defensive"
                        ? "Defensive Shape"
                        : session.training_style === "smallSided"
                        ? "Small-Sided Games"
                        : session.training_style === "physical"
                        ? "Physical Conditioning"
                        : session.training_style === "mental"
                        ? "Mental Toughness"
                        : session.training_style === "wing"
                        ? "Wing Play"
                        : session.training_style === "betweenLines"
                        ? "Playing Between Lines"
                        : session.training_style === "oneVsOne"
                        ? "1v1 Domination"
                        : session.training_style === "mixed"
                        ? "Mixed approach"
                        : session.training_style || "Not specified"}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {onToggleFavorite && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-coaching-300 hover:text-coaching-50 hover:bg-coaching-700/50"
                        onClick={() =>
                          handleToggleFavorite(session.id, session.is_favorite)
                        }
                      >
                        {session.is_favorite ? (
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {session.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-coaching-50">
                      Notes
                    </h4>
                    <p className="text-sm text-coaching-300 whitespace-pre-line">
                      {session.notes}
                    </p>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-coaching-50">
                      Tags
                    </h4>
                    {onUpdateTags && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs text-coaching-300 hover:text-coaching-50"
                        onClick={() => startEditingTags(session.id)}
                      >
                        Edit Tags
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tags.length > 0 ? (
                      tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-coaching-700/50 text-coaching-200"
                        >
                          {tag}
                          {onUpdateTags && editingTagsForId === session.id && (
                            <button
                              className="ml-1 rounded-full hover:bg-coaching-800 p-0.5"
                              onClick={() => removeTag(session.id, tag, tags)}
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 4L4 12M4 4L12 12"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          )}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-coaching-400 italic">
                        No tags
                      </span>
                    )}

                    {onUpdateTags &&
                      editingTagsForId === session.id &&
                      tags.length < 8 && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Badge
                              variant="outline"
                              className="cursor-pointer bg-coaching-700/50 border-dashed border-coaching-600 text-coaching-300 hover:bg-coaching-600/70"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add
                            </Badge>
                          </PopoverTrigger>
                          <PopoverContent className="w-64 p-0" align="start">
                            <Command>
                              <CommandInput
                                placeholder="Search or add new tag..."
                                value={tagInput}
                                onValueChange={setTagInput}
                                className="border-none focus:ring-0"
                              />
                              <CommandList>
                                <CommandEmpty>
                                  <button
                                    className="w-full p-2 text-left text-sm hover:bg-coaching-700"
                                    onClick={() =>
                                      addTag(session.id, tagInput, tags)
                                    }
                                  >
                                    Add "{tagInput}"
                                  </button>
                                </CommandEmpty>
                                <CommandGroup heading="Common Tags">
                                  <ScrollArea className="h-60">
                                    {commonTags
                                      .filter(
                                        (tag) =>
                                          !tags.includes(tag) &&
                                          tag
                                            .toLowerCase()
                                            .includes(tagInput.toLowerCase())
                                      )
                                      .map((tag) => (
                                        <CommandItem
                                          key={tag}
                                          onSelect={() =>
                                            addTag(session.id, tag, tags)
                                          }
                                          className="cursor-pointer"
                                        >
                                          {tag}
                                        </CommandItem>
                                      ))}
                                  </ScrollArea>
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      )}
                  </div>
                </div>

                {session.ai_generated_plan && (
                  <div>
                    <h4 className="text-sm font-medium text-coaching-50 mb-2">
                      AI Generated Plan
                    </h4>
                    <ScrollArea className="h-64 rounded border border-coaching-700 bg-coaching-800/50 p-4">
                      <div className="text-sm text-coaching-200 whitespace-pre-line text-start">
                        <ReactMarkdown>
                          {session.ai_generated_plan}
                        </ReactMarkdown>
                      </div>
                    </ScrollArea>
                  </div>
                )}

                <div className="text-xs text-coaching-400">
                  Created:{" "}
                  {session.created_at
                    ? format(new Date(session.created_at), "MMM d, yyyy")
                    : "Unknown date"}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
};
