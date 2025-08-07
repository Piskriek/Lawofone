import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { TrendingUp, Heart, Zap, Shield } from 'lucide-react';

const OverallMetrics = ({ profile, energyCenters, chakraData }) => {
  if (!profile) return null;

  const calculateOverallFrequency = () => {
    const total = Object.values(energyCenters).reduce((sum, center) => sum + center.frequency, 0);
    return Math.round(total / Object.values(energyCenters).length);
  };

  const calculateOverallBlockage = () => {
    const total = Object.values(energyCenters).reduce((sum, center) => sum + center.blockage, 0);
    return Math.round(total / Object.values(energyCenters).length);
  };

  const getTopChakras = () => {
    return Object.entries(energyCenters)
      .map(([key, center]) => ({
        key,
        name: chakraData.find(c => c.key === key)?.name || key,
        color: chakraData.find(c => c.key === key)?.solidColor || 'bg-gray-500',
        health: Math.max(0, (center.frequency + center.balance - center.blockage) / 3)
      }))
      .sort((a, b) => b.health - a.health)
      .slice(0, 3);
  };

  const overallFrequency = calculateOverallFrequency();
  const overallBlockage = calculateOverallBlockage();
  const topChakras = getTopChakras();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Spiritual Level */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-indigo-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-indigo-700 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Spiritual Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-indigo-900 mb-1" title="Represents your overall spiritual development level based on your energy centers.">{profile.overallLevel}</div>
          <Progress value={overallFrequency} className="h-2" />
          <p className="text-xs text-indigo-600 mt-1">Frequency: {overallFrequency}%</p>
        </CardContent>
      </Card>

      {/* Balance Score */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Balance Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900 mb-1" title="Indicates the harmony and equilibrium across your energy centers.">{profile.overallBalance}%</div>
          <Progress value={profile.overallBalance} className="h-2" />
          <p className="text-xs text-green-600 mt-1">Harmony Level</p>
        </CardContent>
      </Card>

      {/* Energy Flow */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-orange-700 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Energy Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-900 mb-1" title="Shows how freely energy is flowing through your system, inversely related to blockage.">{100 - overallBlockage}%</div>
          <Progress value={100 - overallBlockage} className="h-2" />
          <p className="text-xs text-orange-600 mt-1">Free Flow Rate</p>
        </CardContent>
      </Card>

      {/* Dominant Center */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Strongest Centers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topChakras.map((chakra, index) => (
              <div key={chakra.key} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${chakra.color}`}></div>
                <span className="text-xs text-purple-700 flex-1">{chakra.name}</span>
                <span className="text-xs font-semibold text-purple-900">{Math.round(chakra.health)}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverallMetrics;