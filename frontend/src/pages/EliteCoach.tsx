import React from "react";
import { ChatContainer } from "@/components/elite-coach/ChatContainer";
import { useCoachChat } from "@/hooks/useCoachChat";
import { useTrialStatus } from "@/hooks/useTrialStatus";

export default function EliteCoach() {
  const {
    input,
    setInput,
    loading,
    messages,
    relevantGuidelines,
    searchingGuidelines,
    handleSubmit,
  } = useCoachChat();

  const { isInTrial, daysLeft, hasActiveSubscription, checkFeatureAccess } =
    useTrialStatus();

  const handleChatSubmit = async (e: React.FormEvent) => {
    if (!checkFeatureAccess("eliteCoach")) {
      return;
    }
    handleSubmit(e);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-coaching-900 to-coaching-800 py-8">
      <div className="container px-4 mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Elite Coach Advisor
        </h1>

        {isInTrial && !hasActiveSubscription && (
          <div className="bg-coaching-700/50 text-coaching-50 p-4 rounded-lg mb-6">
            <p className="text-center">
              Trial Period: {daysLeft} {daysLeft === 1 ? "day" : "days"}{" "}
              remaining
            </p>
          </div>
        )}

        <ChatContainer
          messages={messages}
          input={input}
          setInput={setInput}
          handleSubmit={handleChatSubmit}
          loading={loading}
          searchingGuidelines={searchingGuidelines}
          relevantGuidelines={relevantGuidelines}
        />
      </div>
    </div>
  );
}
