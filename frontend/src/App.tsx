
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Auth from "./pages/Auth";
import AuthGuard from "./components/AuthGuard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import "@/App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OpponentAnalysis from "./components/OpponentAnalysis";
import TrainingSession from "./pages/TrainingSession";
import EliteCoach from "./pages/EliteCoach";
import Subscription from "./pages/Subscription";

// Game Plan Components
import GamePlanComponent from "./components/game-plan/GamePlanComponent";
import { GamePlanAnalysis } from "./components/game-plan/GamePlanAnalysis";

// Setup React Query
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route 
              path="/" 
              element={
                <AuthGuard>
                  <Index />
                </AuthGuard>
              }
            />
            <Route 
              path="/game-plan" 
              element={
                <AuthGuard>
                  <GamePlanComponent />
                </AuthGuard>
              }
            />
            <Route 
              path="/game-plan-analysis/:planId" 
              element={
                <AuthGuard>
                  <GamePlanAnalysis />
                </AuthGuard>
              }
            />
            <Route 
              path="/opponent-analysis" 
              element={
                <AuthGuard>
                  <OpponentAnalysis />
                </AuthGuard>
              }
            />
            <Route 
              path="/training-session" 
              element={
                <AuthGuard>
                  <TrainingSession />
                </AuthGuard>
              }
            />
            <Route 
              path="/elite-coach" 
              element={
                <AuthGuard>
                  <EliteCoach />
                </AuthGuard>
              }
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
