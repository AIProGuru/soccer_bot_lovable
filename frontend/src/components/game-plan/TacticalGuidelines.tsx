
import React, { useEffect, useState } from 'react';
import { fetchTacticalGuidelines, groupGuidelinesByCategory, TacticalGuideline } from '@/lib/api/guidelines';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, BookOpen, Users, Zap, ShieldAlert, TrendingUp, Target, Crosshair, Brain, Settings2, PenTool, LightbulbIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TacticalGuidelinesProps {
  formation?: string;
  playStyle?: string;
}

export const TacticalGuidelines: React.FC<TacticalGuidelinesProps> = ({
  formation,
  playStyle
}) => {
  const [guidelines, setGuidelines] = useState<TacticalGuideline[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [groupedGuidelines, setGroupedGuidelines] = useState<Record<string, TacticalGuideline[]>>({});

  useEffect(() => {
    const loadGuidelines = async () => {
      setLoading(true);
      
      try {
        const data = await fetchTacticalGuidelines(formation, playStyle);
        setGuidelines(data);
        
        // Group guidelines by category
        const grouped = groupGuidelinesByCategory(data);
        setGroupedGuidelines(grouped);
        
        // Set default active category
        if (data.length > 0) {
          const categories = Object.keys(grouped);
          if (categories.length > 0 && activeCategory === 'all') {
            setActiveCategory(categories[0]);
          }
        }
      } catch (error) {
        console.error('Error loading guidelines:', error);
        setGuidelines([]);
        setGroupedGuidelines({});
      } finally {
        setLoading(false);
      }
    };

    loadGuidelines();
  }, [formation, playStyle]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-coaching-500" />
      </div>
    );
  }

  if (guidelines.length === 0) {
    return (
      <Card className="mt-4 bg-coaching-800 border-coaching-700">
        <CardHeader>
          <CardTitle className="text-xl text-coaching-50">Tactical Guidelines</CardTitle>
          <CardDescription className="text-coaching-300">
            No specific guidelines available for the selected tactics.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'tactical':
      case 'tactics':
        return <Zap className="h-4 w-4 mr-2" />;
      case 'player':
      case 'players':
        return <Users className="h-4 w-4 mr-2" />;
      case 'defense':
      case 'defensive':
        return <ShieldAlert className="h-4 w-4 mr-2" />;
      case 'attack':
      case 'offensive':
        return <TrendingUp className="h-4 w-4 mr-2" />;
      case 'focus':
        return <Target className="h-4 w-4 mr-2" />;
      case 'positioning':
        return <Crosshair className="h-4 w-4 mr-2" />;
      case 'mentality':
        return <Brain className="h-4 w-4 mr-2" />;
      case 'adjustments':
        return <Settings2 className="h-4 w-4 mr-2" />;
      case 'training':
        return <PenTool className="h-4 w-4 mr-2" />;
      case 'inspiration':
        return <LightbulbIcon className="h-4 w-4 mr-2" />;
      default:
        return <BookOpen className="h-4 w-4 mr-2" />;
    }
  };

  // Get unique categories from guidelines
  const categories = Object.keys(groupedGuidelines);

  return (
    <Card className="mt-4 bg-coaching-800 border-coaching-700">
      <CardHeader>
        <CardTitle className="text-xl text-coaching-50">Tactical Guidelines</CardTitle>
        <CardDescription className="text-coaching-300">
          Professional coaching advice tailored to your selections
        </CardDescription>
      </CardHeader>
      <CardContent>
        {categories.length > 1 && (
          <Tabs defaultValue={activeCategory} className="mb-4" onValueChange={setActiveCategory}>
            <TabsList className="bg-coaching-700 border-coaching-600">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-coaching-600 data-[state=active]:text-coaching-50"
                >
                  <span className="flex items-center">
                    {getCategoryIcon(category)}
                    {category}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <ScrollArea className="h-[300px] pr-4">
                  {groupedGuidelines[category]?.map((guideline) => (
                    <div key={guideline.id} className="mb-4 pb-4 border-b border-coaching-700 last:border-0">
                      <h3 className="font-semibold text-coaching-50 mb-2">{guideline.title}</h3>
                      <p className="text-coaching-300 whitespace-pre-line">{guideline.content}</p>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        )}
        
        {categories.length === 1 && (
          <ScrollArea className="h-[300px] pr-4">
            {guidelines.map((guideline) => (
              <div key={guideline.id} className="mb-4 pb-4 border-b border-coaching-700 last:border-0">
                <h3 className="font-semibold text-coaching-50 mb-2">{guideline.title}</h3>
                <p className="text-coaching-300 whitespace-pre-line">{guideline.content}</p>
              </div>
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
