// Replace this entire component with the following:
import React, { useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "home", label: "Home" },
  { id: "problem", label: "Problem" },
  { id: "advantage", label: "Advantage" },
  { id: "how", label: "How It Works" },
  { id: "faqs", label: "FAQs" },
];

const faqs = [
  {
    question: "Is this only for professional coaches?",
    answer:
      "Nope! Whether you're coaching grassroots, youth, or pro teams — our AI helps at every level.",
  },
  {
    question: "What do I need to get started?",
    answer:
      "Just match footage or game data. Upload it, and our AI does the rest.",
  },
  {
    question: "Is the platform mobile-friendly?",
    answer: "Absolutely. You can access reports and insights from any device.",
  },
];

const LandingPage = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#181818] text-white min-h-screen font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f0f0f] border-b border-gray-700 shadow-lg">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-extrabold tracking-wide text-white">
            AI Coach
          </h1>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 gap-8">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => scrollToSection(s.id)}
                  className="text-sm font-medium hover:text-blue-500 transition duration-200"
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.ul
            className="md:hidden flex flex-col items-center space-y-4 pb-4 bg-[#0f0f0f]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => {
                    scrollToSection(s.id);
                    setIsMenuOpen(false);
                  }}
                  className="text-sm font-medium text-white hover:text-blue-500 transition duration-200"
                >
                  {s.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </header>

      {/* Sections */}
      {[
        {
          id: "home",
          title: "Win More Matches with AI – Your Tactical Edge Starts Now!",
          subtitle: "Coaches Using AI Win More Games – Are You Next?",
          img: "./Home.png",
          items: [
            "Outsmart Opponents Faster — Real-time AI insights on formation, tactics & strategy.",
            "Opponent Weakness Exploiter: AI analyzes rival teams & recommends strategy shifts.",
            "Data-Driven Coaching: AI removes guesswork & gives tactical insights coaches can trust.",
          ],
        },
        {
          id: "problem",
          title: "Coaching Without AI? Here’s Why You’re Falling Behind",
          img: "./Problem.png",
          items: [
            "Stop Wasting Hours on Film – AI Analyzes Matches in Seconds",
            "Your Rivals Use AI – If You Don’t, You’re Playing Catch-Up",
            "Training Mistakes Cost Wins & Players – AI Prevents That",
            "You’re Managing Players, Opponents & Pressure — Alone. AI becomes your tactical assistant, working 24/7 behind the scenes.",
          ],
          description:
            "Solution: AI Turns Your Decisions from Guesswork to Game-Winning Strategy",
        },
        {
          id: "advantage",
          title: "The AI Advantage",
          img: "./Advantage.png",
          items: [
            "Get real-time tactical suggestions during matches.",
            "Discover and target opponent weaknesses with ease.",
            "Customize training sessions based on performance metrics.",
            "Let AI handle the analysis so you can focus on coaching.",
          ],
        },
      ].map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-gray-700"
        >
          <motion.img
            src={section.img}
            alt={section.title}
            className="w-full max-w-lg mx-auto mb-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-lg sm:text-xl text-gray-300 mb-6">
              {section.subtitle}
            </p>
          )}
          <ul className="space-y-3 text-gray-400 text-base sm:text-lg mb-6 text-left sm:text-center">
            {section.items.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
          {section.description && (
            <p className="text-gray-300 text-base sm:text-lg mb-6">
              <strong>{section.description}</strong>
            </p>
          )}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#3B82F6" }}
            className="bg-blue-600 text-white text-base sm:text-lg px-5 py-3 rounded-2xl shadow-md"
          >
            UNLOCK YOUR SECRET
          </motion.button>
        </section>
      ))}

      {/* How It Works Section */}
      <section
        id="how"
        className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-gray-700"
      >
        <motion.img
          src="./How.png"
          alt="How AI Works"
          className="w-full max-w-lg mx-auto mb-8 rounded-2xl shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">How It Works</h2>
        <div className="text-gray-300 space-y-4 text-base sm:text-lg mb-8 text-left sm:text-center">
          <p>1. Upload your match footage or opponent data.</p>
          <p>2. Let our AI process formations, movements, and patterns.</p>
          <p>
            3. Receive actionable tactical reports and strategy suggestions.
          </p>
          <p>4. Apply insights on training ground and matchday — instantly.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#3B82F6" }}
          className="bg-blue-600 text-white text-base sm:text-lg px-5 py-3 rounded-2xl shadow-md"
        >
          UNLOCK YOUR SECRET
        </motion.button>
      </section>

      {/* FAQs Section */}
      <section
        id="faqs"
        className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-gray-700"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          FAQs
        </h2>
        <div className="space-y-6 text-gray-300">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => toggleFAQ(index)}
                className="text-left w-full text-lg sm:text-xl font-semibold focus:outline-none hover:text-blue-400 transition"
              >
                {faq.question}
              </button>
              {activeFAQ === index && (
                <motion.p
                  className="mt-2 text-gray-400 text-base"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#3B82F6" }}
            className="bg-blue-600 text-white text-base sm:text-lg px-5 py-3 rounded-2xl shadow-md"
          >
            UNLOCK YOUR SECRET
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t border-gray-700 px-4">
        © {new Date().getFullYear()} AI Coach. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
