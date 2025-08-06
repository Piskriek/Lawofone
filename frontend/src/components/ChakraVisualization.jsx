import React from 'react';

const ChakraVisualization = ({ energyCenters, chakraData }) => {
  const calculateHealth = (center) => {
    return Math.max(0, (center.frequency + center.balance - center.blockage) / 3);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Human Silhouette with Chakras */}
      <div className="relative h-96 w-48 mx-auto">
        {/* Body Outline */}
        <div className="absolute inset-x-0 top-8 bottom-0 w-32 mx-auto bg-gradient-to-b from-gray-100 to-gray-200 rounded-full opacity-20"></div>
        
        {/* Head */}
        <div className="absolute top-0 inset-x-0 w-20 h-20 mx-auto bg-gradient-to-b from-gray-100 to-gray-200 rounded-full opacity-20"></div>

        {/* Chakra Points */}
        {chakraData.map((chakra, index) => {
          const health = calculateHealth(energyCenters[chakra.key]);
          const positions = [
            { top: '85%', name: 'Root' },      // Root
            { top: '78%', name: 'Sacral' },    // Sacral
            { top: '68%', name: 'Solar' },     // Solar Plexus
            { top: '55%', name: 'Heart' },     // Heart
            { top: '42%', name: 'Throat' },    // Throat
            { top: '25%', name: 'Third Eye' }, // Third Eye
            { top: '8%', name: 'Crown' }       // Crown
          ];

          const position = positions[index];
          const size = Math.max(16, (health / 100) * 48 + 16);
          const opacity = Math.max(0.3, health / 100);

          return (
            <div key={chakra.key} className="absolute left-1/2 transform -translate-x-1/2" style={{ top: position.top }}>
              {/* Chakra Glow Effect */}
              <div 
                className={`absolute inset-0 rounded-full blur-md ${chakra.solidColor} opacity-20`}
                style={{ 
                  width: `${size + 8}px`, 
                  height: `${size + 8}px`,
                  left: '-4px',
                  top: '-4px'
                }}
              ></div>
              
              {/* Main Chakra Point */}
              <div 
                className={`relative rounded-full ${chakra.solidColor} transition-all duration-500 hover:scale-110 cursor-pointer shadow-lg`}
                style={{ 
                  width: `${size}px`, 
                  height: `${size}px`,
                  opacity: opacity
                }}
                title={`${chakra.name}: ${Math.round(health)}% health`}
              >
                {/* Inner glow */}
                <div className="absolute inset-1 rounded-full bg-white opacity-30"></div>
                
                {/* Health indicator ring */}
                <div className="absolute inset-0 rounded-full border-2 border-white opacity-40"></div>
              </div>

              {/* Chakra Label */}
              <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 hidden md:block">
                <div className="text-xs font-medium text-gray-700 whitespace-nowrap">
                  {position.name}
                </div>
                <div className="text-xs text-gray-500">
                  {Math.round(health)}%
                </div>
              </div>
            </div>
          );
        })}

        {/* Energy Flow Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {chakraData.slice(0, -1).map((_, index) => {
            const positions = ['85%', '78%', '68%', '55%', '42%', '25%'];
            return (
              <div
                key={`flow-${index}`}
                className="absolute left-1/2 w-0.5 bg-gradient-to-b from-indigo-300 to-purple-300 opacity-30 transform -translate-x-1/2"
                style={{ 
                  top: positions[index + 1],
                  height: `calc(${positions[index]} - ${positions[index + 1]})`
                }}
              ></div>
            );
          })}
        </div>
      </div>

      {/* Energy Flow Meter */}
      <div className="mt-8">
        <div className="text-sm font-medium text-gray-700 mb-2 text-center">Overall Energy Flow</div>
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-violet-400 transition-all duration-1000 rounded-full"
            style={{ 
              width: `${Math.max(5, Object.values(energyCenters).reduce((sum, center) => 
                sum + calculateHealth(center), 0) / 7)}%` 
            }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 text-center mt-1">
          {Math.round(Object.values(energyCenters).reduce((sum, center) => 
            sum + calculateHealth(center), 0) / 7)}% Balanced
        </div>
      </div>
    </div>
  );
};

export default ChakraVisualization;