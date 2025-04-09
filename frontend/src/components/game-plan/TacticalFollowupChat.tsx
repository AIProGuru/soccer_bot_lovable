import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { MatchDetails, Tactics } from "./hooks/useGamePlanState";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
const BACKEND_SERVER_URL = import.meta.env.VITE_SERVER_URL;

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface TacticalFollowupChatProps {
  tactics: Tactics;
  matchDetails?: MatchDetails; // Make optional for backward compatibility
  aiSuggestions: string;
}

export const TacticalFollowupChat = ({
  tactics,
  matchDetails,
  aiSuggestions,
}: TacticalFollowupChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = newMessage.trim();
    setNewMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("You must be logged in to create a training session");
      }
      const { data: profile, error: profileError } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_id", user.id)
        .single();

      const response = await fetch(
        `${BACKEND_SERVER_URL}/v1/assistant/generate-followup-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userQuery: userMessage,
            tactics,
            matchDetails,
            aiSuggestions,
            keyTacticalPrinciples: tactics.keyTacticalPrinciples,
            assistantId: profile.assistant_id,
            threadId: profile.thread_id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const message = data["message"];

      setMessages((prev) => [...prev, { role: "assistant", content: message }]);
    } catch (error) {
      console.error("Error in tactical follow-up:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't process your question. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-6 bg-coaching-800 border-coaching-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-coaching-50">
          Ask Follow-Up Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 max-h-[300px] overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <p className="text-coaching-400 text-sm italic">
              Ask specific questions about the tactical approach or request
              clarification on any aspect of the game plan.
            </p>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-coaching-700 ml-8"
                    : "bg-coaching-600 mr-8"
                }`}
              >
                <p className="text-coaching-50 whitespace-pre-wrap text-start">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </p>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-center">
              <LoaderCircle className="animate-spin text-coaching-400" />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask a tactical question..."
            rows={2}
            className="bg-coaching-700 border-coaching-600 text-coaching-50 placeholder:text-coaching-400"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !newMessage.trim()}
            className="w-full bg-coaching-500 hover:bg-coaching-400"
          >
            {isLoading ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Thinking...
              </>
            ) : (
              "Send Question"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
