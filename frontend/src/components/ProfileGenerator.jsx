import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import EnergyCenter from './EnergyCenter';
import DescriptionPanel from './DescriptionPanel';
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
      bgColor: 'bg-red-50',
      description: 'Foundation, Survival, Grounding' 
    },
    { 
      key: 'sacral', 
      name: 'Sacral Chakra', 
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Creativity, Sexuality, Emotions' 
    },
    { 
      key: 'solarPlexus', 
      name: 'Solar Plexus', 
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Personal Power, Confidence' 
    },
    { 
      key: 'heart', 
      name: 'Heart Chakra', 
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      description: 'Love, Compassion, Connection' 
    },
    { 
      key: 'throat', 
      name: 'Throat Chakra', 
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Communication, Truth, Expression' 
    },
    { 
      key: 'thirdEye', 
      name: 'Third Eye', 
      color: 'from-indigo-400 to-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Intuition, Wisdom, Insight' 
    },
    { 
      key: 'crown', 
      name: 'Crown Chakra', 
      color: 'from-violet-400 to-violet-600',
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
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Law of One Profile Generator
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Adjust your energy centers to discover your spiritual profile and receive personalized guidance for balance and growth.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Energy Centers Panel */}
        <div className="space-y-6">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-800">
                Energy Centers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {chakraData.map((chakra) => (
                <EnergyCenter
                  key={chakra.key}
                  chakraKey={chakra.key}
                  name={chakra.name}
                  color={chakra.color}
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
        <div className="lg:sticky lg:top-4 lg:h-fit">
          <DescriptionPanel profile={profile} />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>Based on the spiritual teachings of the Law of One material</p>
      </footer>
    </div>
  );
};

export default ProfileGenerator;