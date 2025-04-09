
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileStack } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { defaultTemplates, SessionTemplate, getStyleDisplayName } from "../templates";

interface TemplatesSelectorProps {
  onApplyTemplate: (template: SessionTemplate) => void;
}

export const TemplatesSelector = ({ onApplyTemplate }: TemplatesSelectorProps) => {
  // Group templates by training style
  const groupedTemplates = defaultTemplates.reduce((acc, template) => {
    const style = template.trainingStyle;
    if (!acc[style]) {
      acc[style] = [];
    }
    acc[style].push(template);
    return acc;
  }, {} as Record<string, SessionTemplate[]>);

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
          <span>🔁 Quick Templates</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search templates..." />
          <CommandList>
            <CommandEmpty>No templates found.</CommandEmpty>
            <ScrollArea className="h-72">
              {templateGroups.map((group) => (
                <CommandGroup key={group} heading={`${getStyleDisplayName(group)} Templates`}>
                  {groupedTemplates[group].map((template) => (
                    <CommandItem
                      key={template.id}
                      onSelect={() => onApplyTemplate(template)}
                      className="flex flex-col items-start"
                    >
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {template.ageGroup.toUpperCase()} • {template.duration} min • {template.playerCount} players
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
