import React from 'react';
import { Slider } from './ui/slider';

const EnergyCenter = ({ chakraKey, name, color, bgColor, description, values, onUpdate }) => {
  const handleSliderChange = (attribute, newValue) => {
    onUpdate(chakraKey, attribute, newValue[0]);
  };

  const getSliderColor = (attribute) => {
    switch (attribute) {
      case 'frequency':
        return 'accent-blue-500';
      case 'balance':
        return 'accent-green-500';
      case 'blockage':
        return 'accent-red-500';
      default:
        return 'accent-gray-500';
    }
  };

  return (
    <div className={`p-6 rounded-xl ${bgColor} border border-gray-200 transition-all duration-300 hover:shadow-md`}>
      {/* Chakra Header */}
      <div className="flex items-center mb-4">
        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${color} mr-3`}></div>
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{name}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-4">
        {/* Frequency Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              Frequency/Vibration
            </label>
            <span className="text-sm text-blue-600 font-semibold">
              {values.frequency}%
            </span>
          </div>
          <Slider
            value={[values.frequency]}
            onValueChange={(value) => handleSliderChange('frequency', value)}
            max={100}
            step={1}
            className={`w-full ${getSliderColor('frequency')}`}
          />
        </div>

        {/* Balance Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              Balance/Alignment
            </label>
            <span className="text-sm text-green-600 font-semibold">
              {values.balance}%
            </span>
          </div>
          <Slider
            value={[values.balance]}
            onValueChange={(value) => handleSliderChange('balance', value)}
            max={100}
            step={1}
            className={`w-full ${getSliderColor('balance')}`}
          />
        </div>

        {/* Blockage Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              Blockage/Distortion
            </label>
            <span className="text-sm text-red-600 font-semibold">
              {values.blockage}%
            </span>
          </div>
          <Slider
            value={[values.blockage]}
            onValueChange={(value) => handleSliderChange('blockage', value)}
            max={100}
            step={1}
            className={`w-full ${getSliderColor('blockage')}`}
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Optimal Range: 60-80%</span>
          <span>Current Health: {Math.round((values.frequency + values.balance - values.blockage) / 3)}%</span>
        </div>
      </div>
    </div>
  );
};

export default EnergyCenter;