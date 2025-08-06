import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import EnergyCenter from './EnergyCenter';
import DescriptionPanel from './DescriptionPanel';
import ChakraVisualization from './ChakraVisualization';
import OverallMetrics from './OverallMetrics';
import { generateProfile } from '../data/mock';

const ProfileGenerator = () => {
  const [energyCenters, setEnergyCenters] = useState({
    root: { frequency: 50, balance: 50, blockage: 30 },
    sacral: { frequency: 50, balance: 50, blockage: 30 },
    solarPlexus: { frequency: 50, balance: 50, blockage: 30 },
    heart: { frequency: 50, balance: 50, blockage: 30 },
    throat: { frequency: 50, balance: 50, blockage: 30 },
    thirdEye: { frequency: 50, balance: 50, blockage: 30 },
    crown: { frequency: 50, balance: 50, blockage: 30 }
  });

  const [profile, setProfile] = useState(null);

  const chakraData = [
    { 
      key: 'root', 
      name: 'Root Chakra', 
      color: 'from-red-400 to-red-600',
      solidColor: 'bg-red-500',
      bgColor: 'bg-red-50',
      description: 'Foundation, Survival, Grounding' 
    },
    { 
      key: 'sacral', 
      name: 'Sacral Chakra', 
      color: 'from-orange-400 to-orange-600',
      solidColor: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      description: 'Creativity, Sexuality, Emotions' 
    },
    { 
      key: 'solarPlexus', 
      name: 'Solar Plexus', 
      color: 'from-yellow-400 to-yellow-600',
      solidColor: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      description: 'Personal Power, Confidence' 
    },
    { 
      key: 'heart', 
      name: 'Heart Chakra', 
      color: 'from-green-400 to-green-600',
      solidColor: 'bg-green-500',
      bgColor: 'bg-green-50',
      description: 'Love, Compassion, Connection' 
    },
    { 
      key: 'throat', 
      name: 'Throat Chakra', 
      color: 'from-blue-400 to-blue-600',
      solidColor: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      description: 'Communication, Truth, Expression' 
    },
    { 
      key: 'thirdEye', 
      name: 'Third Eye', 
      color: 'from-indigo-400 to-indigo-600',
      solidColor: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
      description: 'Intuition, Wisdom, Insight' 
    },
    { 
      key: 'crown', 
      name: 'Crown Chakra', 
      color: 'from-violet-400 to-violet-600',
      solidColor: 'bg-violet-500',
      bgColor: 'bg-violet-50',
      description: 'Spirituality, Unity, Transcendence' 
    }
  ];

  const updateEnergyCenter = (chakraKey, attribute, value) => {
    setEnergyCenters(prev => ({
      ...prev,
      [chakraKey]: {
        ...prev[chakraKey],
        [attribute]: value
      }
    }));
  };

  useEffect(() => {
    const newProfile = generateProfile(energyCenters);
    setProfile(newProfile);
  }, [energyCenters]);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Law of One Profile Generator
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Adjust your energy centers to discover your spiritual profile and receive personalized guidance for balance and growth.
        </p>
      </div>

      {/* Overall Metrics Dashboard */}
      <div className="max-w-7xl mx-auto mb-12">
        <OverallMetrics profile={profile} energyCenters={energyCenters} chakraData={chakraData} />
      </div>

      <div className="max-w-7xl mx-auto grid xl:grid-cols-3 gap-8">
        {/* Chakra Visualization */}
        <div className="xl:col-span-1">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm sticky top-4">
            <CardHeader>
              <CardTitle className="text-xl text-center text-gray-800">
                Energy Centers Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChakraVisualization energyCenters={energyCenters} chakraData={chakraData} />
            </CardContent>
          </Card>
        </div>

        {/* Energy Centers Controls */}
        <div className="xl:col-span-1 space-y-4">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-center text-gray-800">
                Adjust Your Energy Centers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {chakraData.map((chakra) => (
                <EnergyCenter
                  key={chakra.key}
                  chakraKey={chakra.key}
                  name={chakra.name}
                  color={chakra.color}
                  solidColor={chakra.solidColor}
                  bgColor={chakra.bgColor}
                  description={chakra.description}
                  values={energyCenters[chakra.key]}
                  onUpdate={updateEnergyCenter}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Description Panel */}
        <div className="xl:col-span-1">
          <div className="sticky top-4">
            <DescriptionPanel profile={profile} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-500 text-sm">
        <div className="max-w-2xl mx-auto">
          <p className="mb-2">Based on the spiritual teachings of the Law of One material</p>
          <p className="text-xs">Adjust your energy centers mindfully and observe how your profile evolves</p>
        </div>
      </footer>
    </div>
  );
};

export default ProfileGenerator;