
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileStack } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GamePlanTemplate, getStyleDisplayName } from "../templates/types";
import { defaultTemplates } from "../templates/defaultTemplates";

interface GamePlanTemplateSelectorProps {
  onApplyTemplate: (template: GamePlanTemplate) => void;
}

export const GamePlanTemplateSelector = ({ onApplyTemplate }: GamePlanTemplateSelectorProps) => {
  // Group templates by play style
  const groupedTemplates = defaultTemplates.reduce((acc, template) => {
    const style = template.teamAnalysis.playStyle;
    if (!acc[style]) {
      acc[style] = [];
    }
    acc[style].push(template);
    return acc;
  }, {} as Record<string, GamePlanTemplate[]>);

  // Get unique template groups
  const templateGroups = Object.keys(groupedTemplates);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 bg-coaching-700/90 border-coaching-600 text-coaching-50 hover:bg-coaching-600"
        >
          <FileStack className="h-4 w-4" />
          <span>Template Library</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search templates..." />
          <CommandList>
            <CommandEmpty>No templates found.</CommandEmpty>
            <ScrollArea className="h-72">
              {templateGroups.map((group) => (
                <CommandGroup key={group} heading={`${getStyleDisplayName(group)} Game Plans`}>
                  {groupedTemplates[group].map((template) => (
                    <CommandItem
                      key={template.id}
                      onSelect={() => onApplyTemplate(template)}
                      className="flex flex-col items-start"
                    >
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {template.teamAnalysis.formation} • {template.matchDetails.venue} • {template.matchDetails.competitionType}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs py-0 px-1">{tag}</Badge>
                        ))}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
