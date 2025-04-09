
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Lock, Unlock, Database, RefreshCcw, Check, X } from "lucide-react";
import { fetchFootballStrategies, saveApiKey, getSavedApiKey, validateApiKey, StrategyData } from "@/lib/api/footballStrategyAPI";

export function FootballStrategyConnection() {
  const [apiKey, setApiKey] = useState<string>("");
  const [savedApiKey, setSavedApiKey] = useState<string | null>(null);
  const [isValidKey, setIsValidKey] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [strategies, setStrategies] = useState<Record<string, StrategyData[]>>({
    formation: [],
    tactic: [],
    analysis: []
  });
  const [loading, setLoading] = useState<Record<string, boolean>>({
    formation: false,
    tactic: false,
    analysis: false
  });
  const [activeTab, setActiveTab] = useState("formation");
  const { toast } = useToast();

  // Load saved API key on mount
  useEffect(() => {
    const loadSavedKey = async () => {
      const key = await getSavedApiKey();
      setSavedApiKey(key);
      if (key) {
        setApiKey(key);
        validateKey(key);
      }
    };
    
    loadSavedKey();
  }, []);

  const validateKey = async (key: string) => {
    setIsChecking(true);
    try {
      const isValid = await validateApiKey(key);
      setIsValidKey(isValid);
      
      if (isValid) {
        toast({
          title: "Valid API Key",
          description: "Your Elite Football Strategy Database connection is active.",
        });
        
        // Load initial data with the valid key
        fetchData("formation", key);
        fetchData("tactic", key);
        fetchData("analysis", key);
      } else {
        toast({
          title: "Invalid API Key",
          description: "The API key format is incorrect. Keys should start with 'ELITE_'.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error validating key:", error);
      setIsValidKey(false);
      toast({
        title: "Validation Error",
        description: "Could not validate the API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleSaveApiKey = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter an API key to connect to the Elite Football Strategy Database.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await validateKey(apiKey);
      
      if (isValidKey) {
        const success = await saveApiKey(apiKey);
        if (success) {
          setSavedApiKey(apiKey);
          toast({
            title: "API Key Saved",
            description: "Your Elite Football Strategy Database API key has been saved.",
          });
        }
      }
    } catch (error) {
      console.error("Error saving API key:", error);
      toast({
        title: "Error Saving Key",
        description: "Could not save the API key. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchData = async (category: string, key: string = apiKey) => {
    setLoading(prev => ({ ...prev, [category]: true }));
    try {
      const data = await fetchFootballStrategies(category, key);
      setStrategies(prev => ({ ...prev, [category]: data }));
    } catch (error) {
      console.error(`Error fetching ${category} data:`, error);
      toast({
        title: `Failed to Load ${category.charAt(0).toUpperCase() + category.slice(1)}`,
        description: "Could not retrieve data from the Elite Football Strategy Database.",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, [category]: false }));
    }
  };

  const refreshData = () => {
    if (isValidKey) {
      fetchData(activeTab);
    } else {
      toast({
        title: "Valid API Key Required",
        description: "Please enter and validate your API key first.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-coaching-800 border-coaching-700 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-coaching-50 flex items-center gap-2">
          <Database className="h-6 w-6" /> Elite Football Strategy Database
        </CardTitle>
        <CardDescription className="text-coaching-300">
          Connect to professional football strategy resources
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Input
              type="password"
              placeholder="Enter API Key (try ELITE_COACH1234)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-coaching-700 border-coaching-600 text-coaching-50"
            />
            <Button 
              onClick={handleSaveApiKey} 
              disabled={isChecking || !apiKey}
              className="bg-coaching-600 hover:bg-coaching-500 text-coaching-50 flex items-center gap-2"
            >
              {isChecking ? (
                <>
                  <RefreshCcw className="h-4 w-4 animate-spin" />
                  Validating...
                </>
              ) : (
                <>
                  {isValidKey ? <Check className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                  {isValidKey ? "Connected" : "Connect"}
                </>
              )}
            </Button>
          </div>
          
          {isValidKey !== null && (
            <div className={`flex items-center gap-2 ${isValidKey ? 'text-green-500' : 'text-red-500'}`}>
              {isValidKey ? (
                <>
                  <Unlock className="h-4 w-4" />
                  <span>Connected to Elite Football Strategy Database</span>
                </>
              ) : (
                <>
                  <X className="h-4 w-4" />
                  <span>Invalid API key format. Keys should start with 'ELITE_'</span>
                </>
              )}
            </div>
          )}
        </div>
        
        <Separator className="bg-coaching-700" />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList className="bg-coaching-700">
              <TabsTrigger value="formation" className="data-[state=active]:bg-coaching-600">
                Formations
              </TabsTrigger>
              <TabsTrigger value="tactic" className="data-[state=active]:bg-coaching-600">
                Tactics
              </TabsTrigger>
              <TabsTrigger value="analysis" className="data-[state=active]:bg-coaching-600">
                Professional Analysis
              </TabsTrigger>
            </TabsList>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshData}
              disabled={!isValidKey || loading[activeTab]}
              className="bg-coaching-700 border-coaching-600 text-coaching-50"
            >
              <RefreshCcw className={`h-4 w-4 mr-2 ${loading[activeTab] ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          <TabsContent value="formation" className="mt-4 space-y-4">
            {loading.formation ? (
              <div className="text-center py-8 text-coaching-300">Loading formations...</div>
            ) : strategies.formation.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {strategies.formation.map(formation => (
                  <Card key={formation.id} className="bg-coaching-700 border-coaching-600">
                    <CardHeader>
                      <CardTitle className="text-coaching-50">{formation.name}</CardTitle>
                      <CardDescription className="text-coaching-300">{formation.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-coaching-200">Key Positions</h4>
                        <p className="text-coaching-300">{formation.data.positions.join(", ")}</p>
                        
                        <h4 className="font-semibold text-coaching-200">Strengths</h4>
                        <ul className="list-disc pl-5 text-coaching-300">
                          {formation.data.strengths.map((strength: string, i: number) => (
                            <li key={i}>{strength}</li>
                          ))}
                        </ul>
                        
                        <h4 className="font-semibold text-coaching-200">Weaknesses</h4>
                        <ul className="list-disc pl-5 text-coaching-300">
                          {Array.isArray(formation.data.weaknesses) 
                            ? formation.data.weaknesses.map((weakness: string, i: number) => (
                                <li key={i}>{weakness}</li>
                              ))
                            : <li>{formation.data.weaknesses}</li>
                          }
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-coaching-400">
                      Source: {formation.source}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-coaching-300">
                {isValidKey 
                  ? "No formation data available. Try refreshing." 
                  : "Enter a valid API key to view professional formations."}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="tactic" className="mt-4 space-y-4">
            {loading.tactic ? (
              <div className="text-center py-8 text-coaching-300">Loading tactics...</div>
            ) : strategies.tactic.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {strategies.tactic.map(tactic => (
                  <Card key={tactic.id} className="bg-coaching-700 border-coaching-600">
                    <CardHeader>
                      <CardTitle className="text-coaching-50">{tactic.name}</CardTitle>
                      <CardDescription className="text-coaching-300">{tactic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-coaching-200">Key Principles</h4>
                        <ul className="list-disc pl-5 text-coaching-300">
                          {tactic.data.principles.map((principle: string, i: number) => (
                            <li key={i}>{principle}</li>
                          ))}
                        </ul>
                        
                        <h4 className="font-semibold text-coaching-200">Required Player Attributes</h4>
                        <p className="text-coaching-300">{tactic.data.requiredAttributes.join(", ")}</p>
                        
                        <h4 className="font-semibold text-coaching-200">Implementation Steps</h4>
                        <ol className="list-decimal pl-5 text-coaching-300">
                          {tactic.data.implementationSteps.map((step: string, i: number) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-coaching-400">
                      Source: {tactic.source}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-coaching-300">
                {isValidKey 
                  ? "No tactical data available. Try refreshing." 
                  : "Enter a valid API key to view professional tactics."}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="analysis" className="mt-4 space-y-4">
            {loading.analysis ? (
              <div className="text-center py-8 text-coaching-300">Loading analysis...</div>
            ) : strategies.analysis.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {strategies.analysis.map(analysis => (
                  <Card key={analysis.id} className="bg-coaching-700 border-coaching-600">
                    <CardHeader>
                      <CardTitle className="text-coaching-50">{analysis.name}</CardTitle>
                      <CardDescription className="text-coaching-300">{analysis.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-coaching-200">Key Insights</h4>
                        <ul className="list-disc pl-5 text-coaching-300">
                          {analysis.data.keyInsights.map((insight: string, i: number) => (
                            <li key={i}>{insight}</li>
                          ))}
                        </ul>
                        
                        <h4 className="font-semibold text-coaching-200">Professional Advice</h4>
                        <p className="text-coaching-300">{analysis.data.implementationAdvice}</p>
                        
                        <div className="mt-4 p-3 bg-coaching-800 rounded-md border border-coaching-600">
                          <p className="italic text-coaching-200">"{analysis.data.professionalQuote}"</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="text-xs text-coaching-400">
                      Source: {analysis.source}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-coaching-300">
                {isValidKey 
                  ? "No analysis data available. Try refreshing." 
                  : "Enter a valid API key to view professional analysis."}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between text-coaching-400 text-xs border-t border-coaching-700 pt-4">
        <div>API Status: {isValidKey ? "Connected" : "Disconnected"}</div>
        <div>
          {savedApiKey ? "API Key: ••••••••" + (savedApiKey.length > 8 ? savedApiKey.slice(-4) : "") : "No API key saved"}
        </div>
      </CardFooter>
    </Card>
  );
}
