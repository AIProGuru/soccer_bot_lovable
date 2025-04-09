
import React from "react";
import { ChatContainer } from "@/components/elite-coach/ChatContainer";
import { useCoachChat } from "@/hooks/useCoachChat";

export default function EliteCoach() {
  const {
    input,
    setInput,
    loading,
    messages,
    relevantGuidelines,
    searchingGuidelines,
    handleSubmit
  } = useCoachChat();

  return (
    <div className="min-h-screen bg-gradient-to-b from-coaching-900 to-coaching-800 py-8">
      <div className="container px-4 mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Elite Coach Advisor
        </h1>
        
        <ChatContainer
          messages={messages}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          loading={loading}
          searchingGuidelines={searchingGuidelines}
          relevantGuidelines={relevantGuidelines}
        />
      </div>
    </div>
  );
}
