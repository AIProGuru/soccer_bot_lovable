
import React, { useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TacticalGuideline } from "@/lib/api/guidelines";

type Message = {
  role: "user" | "assistant";
  content: string;
  guidelineId?: number;
};

type ChatContainerProps = {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  searchingGuidelines: boolean;
  relevantGuidelines: TacticalGuideline[];
};

export const ChatContainer = ({
  messages,
  input,
  setInput,
  handleSubmit,
  loading,
  searchingGuidelines,
  relevantGuidelines,
}: ChatContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className="bg-coaching-800/80 border-coaching-700 shadow-lg mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-coaching-50 flex items-center">
          <BrainCircuit className="h-5 w-5 mr-2 text-coaching-300" />
          Chat with Elite Football Mind
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4 max-h-[500px] overflow-y-auto p-2 mb-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              guidelineId={message.guidelineId}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <ChatInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          loading={loading}
          searchingGuidelines={searchingGuidelines}
          relevantGuidelines={relevantGuidelines}
        />
      </CardContent>
    </Card>
  );
};
