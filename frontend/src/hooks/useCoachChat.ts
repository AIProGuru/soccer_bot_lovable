import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import {
  searchTacticalGuidelines,
  TacticalGuideline,
} from "@/lib/api/guidelines";
const BACKEND_SERVER_URL = import.meta.env.VITE_SERVER_URL;

type Message = {
  role: "user" | "assistant";
  content: string;
  // guidelineId?: number;
};

export const useCoachChat = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "I'm your Elite Coach Assistant with UEFA Pro License expertise. How can I help with your football tactics today? Ask me about formations, pressing systems, or breaking down defensive blocks.",
    },
  ]);
  const [relevantGuidelines, setRelevantGuidelines] = useState<
    TacticalGuideline[]
  >([]);
  const [searchingGuidelines, setSearchingGuidelines] = useState(false);
  const { toast } = useToast();

  const searchForRelevantGuidelines = async (query: string) => {
    if (!query.trim()) return;

    setSearchingGuidelines(true);
    try {
      const guidelines = await searchTacticalGuidelines(query);
      setRelevantGuidelines(guidelines);
    } catch (error) {
      console.error("Error searching guidelines:", error);
    } finally {
      setSearchingGuidelines(false);
    }
  };

  const generateResponse = async (userQuery: string) => {
    await searchForRelevantGuidelines(userQuery);

    try {
      if (relevantGuidelines.length > 0) {
        const mostRelevantGuideline = relevantGuidelines[0];
        return {
          content: mostRelevantGuideline.content,
          guidelineId: mostRelevantGuideline.id,
        };
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("You must be logged in to create a training session");
      }

      // Generate AI training plan

      const { data: profile, error: profileError } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_id", user.id)
        .single();

      const response = await fetch(
        `${BACKEND_SERVER_URL}/v1/assistant/elite-coach-advisor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userQuery,
            threadId: profile.thread_id,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text(); // You can use response.json() if the backend returns JSON
        throw new Error(`Failed to generate plan: ${errorText}`);
      }

      const responseData = await response.json();

      const message = responseData["message"];

      console.log(message);

      if (response) {
        return { content: message };
      }

      return {
        content:
          "I couldn't find specific information about that. Please try asking another tactical question.",
      };
    } catch (error) {
      console.error("Error generating response:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await generateResponse(input);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.content,
        },
      ]);
    } catch (error) {
      console.error("Error getting advice:", error);
      toast({
        title: "Error",
        description: "Failed to get coaching advice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRelevantGuidelines([]);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (value.length > 3 && !loading) {
      searchForRelevantGuidelines(value);
    }
  };

  return {
    input,
    setInput: handleInputChange,
    loading,
    messages,
    relevantGuidelines,
    searchingGuidelines,
    handleSubmit,
  };
};
