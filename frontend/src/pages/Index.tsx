
import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-coaching-900 to-coaching-800 py-8">
      <div className="container px-4 mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Elite Football Coach
          </h1>
          <p className="text-xl text-coaching-200 max-w-3xl mx-auto">
            Professional-grade football coaching tools powered by advanced analytics
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Link
            to="/training-session"
            className="bg-coaching-800 hover:bg-coaching-700 transition-colors p-8 rounded-xl border border-coaching-700 text-center"
          >
            <h2 className="text-2xl font-bold text-coaching-50 mb-4">Training Session Planner</h2>
            <p className="text-coaching-300">
              Design effective training sessions tailored to your team's needs
            </p>
          </Link>
          
          <Link
            to="/game-plan"
            className="bg-coaching-800 hover:bg-coaching-700 transition-colors p-8 rounded-xl border border-coaching-700 text-center"
          >
            <h2 className="text-2xl font-bold text-coaching-50 mb-4">Game Plan Creator</h2>
            <p className="text-coaching-300">
              Create professional match-day tactical plans with AI assistance
            </p>
          </Link>
          
          <Link
            to="/opponent-analysis"
            className="bg-coaching-800 hover:bg-coaching-700 transition-colors p-8 rounded-xl border border-coaching-700 text-center"
          >
            <h2 className="text-2xl font-bold text-coaching-50 mb-4">Opponent Analysis</h2>
            <p className="text-coaching-300">
              Break down opponent strengths and weaknesses for competitive advantage
            </p>
          </Link>
          
          <Link
            to="/elite-coach"
            className="bg-coaching-800 hover:bg-coaching-700 transition-colors p-8 rounded-xl border border-coaching-700 text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-blue-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            <h2 className="text-2xl font-bold text-coaching-50 mb-4 relative z-10">Elite Coach Advisor</h2>
            <p className="text-coaching-300 relative z-10">
              Get real-time AI coaching advice from football's tactical minds
            </p>
            <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">New</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
