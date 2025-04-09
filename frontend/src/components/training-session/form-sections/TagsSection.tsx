
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandList } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tag } from "lucide-react";
import { commonTags } from "../constants";

interface TagsSectionProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const TagsSection = ({ tags, onTagsChange }: TagsSectionProps) => {
  const [tagInput, setTagInput] = useState('');

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      onTagsChange([...tags, tag]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    onTagsChange(tags.filter(t => t !== tag));
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <Label htmlFor="tags" className="text-coaching-50 font-medium text-base">Tags</Label>
        <div className="text-xs text-coaching-300">
          {tags.length} / 8 tags
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <Badge 
            key={tag}
            variant="secondary"
            className="bg-coaching-700/50 text-coaching-200 hover:bg-coaching-600/70 flex items-center gap-1"
          >
            {tag}
            <button 
              className="ml-1 rounded-full hover:bg-coaching-800 p-0.5"
              onClick={() => removeTag(tag)}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Badge>
        ))}
        
        {tags.length < 8 && (
          <Popover>
            <PopoverTrigger asChild>
              <Badge 
                variant="outline" 
                className="cursor-pointer bg-coaching-700/50 border-dashed border-coaching-600 text-coaching-300 hover:bg-coaching-600/70"
              >
                <Tag className="h-3 w-3 mr-1" />
                Add tag
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
                      onClick={() => addTag(tagInput)}
                    >
                      Add "{tagInput}"
                    </button>
                  </CommandEmpty>
                  <CommandGroup heading="Tag Categories">
                    <ScrollArea className="h-60">
                      <div className="p-2 border-b border-coaching-700">
                        <h4 className="text-xs font-medium text-coaching-400 mb-1">Session Types</h4>
                        <div className="flex flex-wrap gap-1">
                          {commonTags.slice(0, 5).map(tag => (
                            <Badge 
                              key={tag} 
                              variant="outline"
                              className="cursor-pointer bg-coaching-700/50 border-coaching-600 text-coaching-200 hover:bg-coaching-600/70 text-xs"
                              onClick={() => addTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 border-b border-coaching-700">
                        <h4 className="text-xs font-medium text-coaching-400 mb-1">Technical Focus</h4>
                        <div className="flex flex-wrap gap-1">
                          {commonTags.slice(5, 14).map(tag => (
                            <Badge 
                              key={tag} 
                              variant="outline"
                              className="cursor-pointer bg-coaching-700/50 border-coaching-600 text-coaching-200 hover:bg-coaching-600/70 text-xs"
                              onClick={() => addTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 border-b border-coaching-700">
                        <h4 className="text-xs font-medium text-coaching-400 mb-1">Tactical Areas</h4>
                        <div className="flex flex-wrap gap-1">
                          {commonTags.slice(14, 26).map(tag => (
                            <Badge 
                              key={tag} 
                              variant="outline"
                              className="cursor-pointer bg-coaching-700/50 border-coaching-600 text-coaching-200 hover:bg-coaching-600/70 text-xs"
                              onClick={() => addTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 border-b border-coaching-700">
                        <h4 className="text-xs font-medium text-coaching-400 mb-1">Physical Aspects</h4>
                        <div className="flex flex-wrap gap-1">
                          {commonTags.slice(26, 35).map(tag => (
                            <Badge 
                              key={tag} 
                              variant="outline"
                              className="cursor-pointer bg-coaching-700/50 border-coaching-600 text-coaching-200 hover:bg-coaching-600/70 text-xs"
                              onClick={() => addTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 border-b border-coaching-700">
                        <h4 className="text-xs font-medium text-coaching-400 mb-1">Playing Formats</h4>
                        <div className="flex flex-wrap gap-1">
                          {commonTags.slice(35, 43).map(tag => (
                            <Badge 
                              key={tag} 
                              variant="outline"
                              className="cursor-pointer bg-coaching-700/50 border-coaching-600 text-coaching-200 hover:bg-coaching-600/70 text-xs"
                              onClick={() => addTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 border-b border-coaching-700">
                        <h4 className="text-xs font-medium text-coaching-400 mb-1">Position-Specific</h4>
                        <div className="flex flex-wrap gap-1">
                          {commonTags.slice(43, 50).map(tag => (
                            <Badge 
                              key={tag} 
                              variant="outline"
                              className="cursor-pointer bg-coaching-700/50 border-coaching-600 text-coaching-200 hover:bg-coaching-600/70 text-xs"
                              onClick={() => addTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 border-b border-coaching-700">
                        <h4 className="text-xs font-medium text-coaching-400 mb-1">Mental Aspects</h4>
                        <div className="flex flex-wrap gap-1">
                          {commonTags.slice(50, 55).map(tag => (
                            <Badge 
                              key={tag} 
                              variant="outline"
                              className="cursor-pointer bg-coaching-700/50 border-coaching-600 text-coaching-200 hover:bg-coaching-600/70 text-xs"
                              onClick={() => addTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 border-b border-coaching-700">
                        <h4 className="text-xs font-medium text-coaching-400 mb-1">Specific Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {commonTags.slice(55, 62).map(tag => (
                            <Badge 
                              key={tag} 
                              variant="outline"
                              className="cursor-pointer bg-coaching-700/50 border-coaching-600 text-coaching-200 hover:bg-coaching-600/70 text-xs"
                              onClick={() => addTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="p-2">
                        <h4 className="text-xs font-medium text-coaching-400 mb-1">Intensity/Format</h4>
                        <div className="flex flex-wrap gap-1">
                          {commonTags.slice(62).map(tag => (
                            <Badge 
                              key={tag} 
                              variant="outline"
                              className="cursor-pointer bg-coaching-700/50 border-coaching-600 text-coaching-200 hover:bg-coaching-600/70 text-xs"
                              onClick={() => addTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};
