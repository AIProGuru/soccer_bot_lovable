import React from "react";
import { BookOpen, BrainCircuit, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

type MessageProps = {
  role: "user" | "assistant";
  content: string;
  guidelineId?: number;
};

export const ChatMessage = ({ role, content, guidelineId }: MessageProps) => {
  return (
    <div
      className={`flex ${
        role === "assistant" ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          role === "assistant"
            ? "bg-coaching-700 text-white"
            : "bg-blue-600 text-white"
        }`}
      >
        <div className="flex items-start gap-2">
          {role === "assistant" ? (
            <div className="flex items-center gap-1">
              {guidelineId ? (
                <BookOpen className="h-5 w-5 text-coaching-300 mt-1 flex-shrink-0" />
              ) : (
                <BrainCircuit className="h-5 w-5 text-coaching-300 mt-1 flex-shrink-0" />
              )}
            </div>
          ) : (
            <User className="h-5 w-5 text-blue-300 mt-1 flex-shrink-0" />
          )}
          <p className="whitespace-pre-line text-start">
            <ReactMarkdown>{content}</ReactMarkdown>
          </p>
        </div>
        {guidelineId && (
          <div className="mt-2 text-xs text-coaching-300 italic">
            Source: Tactical Document
          </div>
        )}
      </div>
    </div>
  );
};
