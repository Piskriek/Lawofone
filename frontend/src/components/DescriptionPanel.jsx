import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Heart, Brain, Sparkles, Target } from 'lucide-react';

const DescriptionPanel = ({ profile }) => {
  if (!profile) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="animate-pulse">
            <Sparkles className="w-12 h-12 mx-auto text-indigo-400 mb-4" />
            <p className="text-gray-600">Generating your spiritual profile...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-gray-800 flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-500" />
          Your Spiritual Profile
        </CardTitle>
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="outline" className="text-indigo-600 border-indigo-200">
            Level: {profile.overallLevel}
          </Badge>
          <Badge variant="outline" className="text-green-600 border-green-200">
            Balance: {profile.overallBalance}%
          </Badge>
          <Badge variant="outline" className="text-purple-600 border-purple-200">
            {profile.dominantChakra}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="personality" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personality" className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Personality</span>
            </TabsTrigger>
            <TabsTrigger value="spiritual" className="flex items-center gap-1">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Spiritual</span>
            </TabsTrigger>
            <TabsTrigger value="healing" className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Healing</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personality" className="space-y-4 mt-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Personality Traits</h3>
              <div className="space-y-2">
                {profile.personality.traits.map((trait, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{trait}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Behavioral Tendencies</h3>
              <div className="space-y-2">
                {profile.personality.behaviors.map((behavior, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-gray-700">{behavior}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="spiritual" className="space-y-4 mt-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Development Level</h3>
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                <p className="text-gray-700">{profile.spiritual.level}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Spiritual Insights</h3>
              <div className="space-y-2">
                {profile.spiritual.insights.map((insight, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg">
                    <p className="text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="healing" className="space-y-4 mt-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Primary Recommendations</h3>
              <div className="space-y-2">
                {profile.healing.practices.map((practice, index) => (
                  <div key={index} className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-gray-700">{practice}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Areas for Growth</h3>
              <div className="space-y-2">
                {profile.healing.growthAreas.map((area, index) => (
                  <div key={index} className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-gray-700">{area}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DescriptionPanel;