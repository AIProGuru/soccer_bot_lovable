
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-coaching-900 to-coaching-800">
      <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-coaching-700 max-w-md">
        <h1 className="text-5xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-coaching-200 mb-6">Oops! Page not found</p>
        <p className="text-coaching-300 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-coaching-600 hover:bg-coaching-500 text-white">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
