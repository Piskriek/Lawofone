import React from 'react';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';

const EnergyCenter = ({ chakraKey, name, color, solidColor, bgColor, description, values, onUpdate }) => {
  const handleSliderChange = (attribute, newValue) => {
    onUpdate(chakraKey, attribute, newValue[0]);
  };

  const calculateHealth = () => {
    return Math.max(0, Math.round((values.frequency + values.balance - values.blockage) / 3));
  };

  const getHealthColor = (health) => {
    if (health >= 70) return 'text-green-600';
    if (health >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const health = calculateHealth();

  return (
    <div className={`p-6 rounded-xl ${bgColor} border border-gray-200 transition-all duration-300 hover:shadow-md hover:scale-[1.02]`}>
      {/* Chakra Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${color} mr-3 shadow-sm`}></div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">{name}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-lg font-bold ${getHealthColor(health)}`}>
            {health}%
          </div>
          <div className="text-xs text-gray-500">Health</div>
        </div>
      </div>

      {/* Health Progress Bar */}
      <div className="mb-4">
        <Progress value={health} className="h-2 mb-1" />
        <div className="text-xs text-gray-500 text-center">Overall Chakra Health</div>
      </div>

      {/* Sliders */}
      <div className="space-y-4">
        {/* Frequency Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Frequency/Vibration
            </label>
            <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded">
              {values.frequency}%
            </span>
          </div>
          <Slider
            value={[values.frequency]}
            onValueChange={(value) => handleSliderChange('frequency', value)}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">Higher frequency indicates elevated spiritual vibration</div>
        </div>

        {/* Balance Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Balance/Alignment
            </label>
            <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">
              {values.balance}%
            </span>
          </div>
          <Slider
            value={[values.balance]}
            onValueChange={(value) => handleSliderChange('balance', value)}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">Alignment with your authentic self and life purpose</div>
        </div>

        {/* Blockage Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Blockage/Distortion
            </label>
            <span className="text-sm text-red-600 font-semibold bg-red-50 px-2 py-1 rounded">
              {values.blockage}%
            </span>
          </div>
          <Slider
            value={[values.blockage]}
            onValueChange={(value) => handleSliderChange('blockage', value)}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">Energetic blocks that limit your spiritual growth</div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
          <div className="text-center">
            <div className="font-semibold text-gray-800">Optimal Range</div>
            <div>70-85%</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-800">Balance State</div>
            <div className={health >= 70 ? 'text-green-600' : health >= 50 ? 'text-yellow-600' : 'text-red-600'}>
              {health >= 70 ? 'Harmonized' : health >= 50 ? 'Developing' : 'Needs Work'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyCenter;