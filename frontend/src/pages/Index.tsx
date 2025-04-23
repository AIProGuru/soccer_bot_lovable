import React from "react";
import { Link } from "react-router-dom";
import { SignOutButton } from "@/components/shared/SignOutButton";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";


const BACKEND_SERVER_URL = import.meta.env.VITE_SERVER_URL;
const Index = () => {
  useEffect(() => {
    const initializeUser = async () => {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;

      if (!userId) return;

      const { data: profile, error: profileError } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (profileError && profileError.code === "PGRST116") {
        try {
          const thread = await fetch(`${BACKEND_SERVER_URL}/v1/assistant`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          });

          if (!thread.ok) {
            throw new Error("Failed to create assistant thread");
          }

          const data = await thread.json();
          const threadId = data?.ids?.threadId;

          const { error: insertError } = await supabase
            .from("user_profile")
            .insert({
              user_id: userId,
              created_at: new Date().toISOString(),
              thread_id: threadId,
            });

          if (insertError) {
            console.error("Error inserting user profile:", insertError);
          } else {
            console.log("✅ User profile inserted");
          }
        } catch (e) {
          console.error("User setup failed:", e);
        }
      }
    };

    initializeUser();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-coaching-900 to-coaching-800 py-8">
      <div className="container px-4 mx-auto max-w-6xl">
        <header className="mb-12 text-center relative">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Elite Football Coach
          </h1>
          <p className="text-xl text-coaching-200 max-w-3xl mx-auto">
            Professional-grade football coaching tools powered by advanced
            analytics
          </p>
          <div className="absolute top-0 right-0">
            <SignOutButton />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Link
            to="/training-session"
            className="bg-coaching-800 hover:bg-coaching-700 transition-colors p-8 rounded-xl border border-coaching-700 text-center"
          >
            <h2 className="text-2xl font-bold text-coaching-50 mb-4">
              Training Session Planner
            </h2>
            <p className="text-coaching-300">
              Design effective training sessions tailored to your team's needs
            </p>
          </Link>

          <Link
            to="/game-plan"
            className="bg-coaching-800 hover:bg-coaching-700 transition-colors p-8 rounded-xl border border-coaching-700 text-center"
          >
            <h2 className="text-2xl font-bold text-coaching-50 mb-4">
              Game Plan Creator
            </h2>
            <p className="text-coaching-300">
              Create professional match-day tactical plans with AI assistance
            </p>
          </Link>

          <Link
            to="/opponent-analysis"
            className="bg-coaching-800 hover:bg-coaching-700 transition-colors p-8 rounded-xl border border-coaching-700 text-center"
          >
            <h2 className="text-2xl font-bold text-coaching-50 mb-4">
              Opponent Analysis
            </h2>
            <p className="text-coaching-300">
              Break down opponent strengths and weaknesses for competitive
              advantage
            </p>
          </Link>

          <Link
            to="/elite-coach"
            className="bg-coaching-800 hover:bg-coaching-700 transition-colors p-8 rounded-xl border border-coaching-700 text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-blue-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            <h2 className="text-2xl font-bold text-coaching-50 mb-4 relative z-10">
              Elite Coach Advisor
            </h2>
            <p className="text-coaching-300 relative z-10">
              Get real-time AI coaching advice from football's tactical minds
            </p>
            <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              New
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
