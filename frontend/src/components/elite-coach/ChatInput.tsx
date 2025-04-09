
import React from "react";
import { Loader2, Search, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TacticalGuideline } from "@/lib/api/guidelines";
import { SuggestedPrompts } from "./SuggestedPrompts";

type ChatInputProps = {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  searchingGuidelines: boolean;
  relevantGuidelines: TacticalGuideline[];
};

export const ChatInput = ({ 
  input, 
  setInput, 
  handleSubmit, 
  loading, 
  searchingGuidelines, 
  relevantGuidelines 
}: ChatInputProps) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <SuggestedPrompts onSelectPrompt={(prompt) => setInput(prompt)} />
      
      <Textarea
        placeholder="Ask any football coaching question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-h-24 bg-coaching-700/30 border-coaching-600 text-white placeholder:text-coaching-400"
        disabled={loading}
      />
      
      {searchingGuidelines && (
        <div className="text-coaching-400 text-sm flex items-center">
          <Search className="h-4 w-4 mr-1 animate-pulse" />
          Searching football knowledge base...
        </div>
      )}
      
      {relevantGuidelines.length > 0 && !loading && (
        <div className="p-2 bg-coaching-700/20 rounded-md">
          <p className="text-coaching-300 text-xs">
            Found {relevantGuidelines.length} relevant football tactics
          </p>
        </div>
      )}
      
      <Button 
        type="submit" 
        disabled={loading || !input.trim()} 
        className="ml-auto"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send
          </>
        )}
      </Button>
    </form>
  );
};
