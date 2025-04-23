import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Facebook, Github } from "lucide-react";


const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL;

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        navigate("/index");
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSignUp = async () => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: REDIRECT_URL,
        },
      });
      if (error) throw error;
      toast({
        title: "Success",
        description: "Check your email for the confirmation link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast({
        title: "Success",
        description: "Successfully signed in!",
      });
      navigate("/index");
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/index`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-coaching-900 to-coaching-800 flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-sm border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-coaching-50">
            Sign In / Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            className="bg-white/10 border-0 text-coaching-50 placeholder:text-coaching-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            className="bg-white/10 border-0 text-coaching-50 placeholder:text-coaching-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex space-x-4">
            <Button
              onClick={handleSignIn}
              disabled={loading}
              className="flex-1 bg-coaching-700 hover:bg-coaching-600 text-coaching-50"
            >
              Sign In
            </Button>
            <Button
              onClick={handleSignUp}
              disabled={loading}
              variant="outline"
              className="flex-1 border-coaching-700 text-coaching-50 hover:bg-coaching-700/20"
            >
              Sign Up
            </Button>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-coaching-700/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-coaching-800 px-2 text-coaching-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={() => handleSocialLogin("google")}
              disabled={loading}
              variant="outline"
              className="flex-1 border-coaching-700 text-coaching-50 hover:bg-coaching-700/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Google
            </Button>
            <Button
              onClick={() => handleSocialLogin("facebook")}
              disabled={loading}
              variant="outline"
              className="flex-1 border-coaching-700 text-coaching-50 hover:bg-coaching-700/20"
            >
              <Facebook className="h-5 w-5 mr-2 text-blue-600" />
              Facebook
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
