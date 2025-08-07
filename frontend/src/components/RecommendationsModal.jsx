import React from 'react';

const RecommendationsModal = ({ recommendations, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="p-8 border w-full max-w-md shadow-lg rounded-md bg-white">
        <h2 className="text-2xl font-semibold mb-6 text-center">Your Personalized Energy Center Action Plan</h2>

        {Object.keys(recommendations).length > 0 ? (
          <>
            <p className="text-gray-700 mb-4">
              Based on your responses, here are some suggested practices to help balance and strengthen your energy centers:
            </p>
            {Object.keys(recommendations).map((chakra) => (
              <div key={chakra} className="mb-4 border-b pb-4">
                <h3 className="text-xl font-medium mb-2 text-blue-700">{chakra}</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {recommendations[chakra].map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="text-gray-700 mt-4">
              Remember, consistency is key. Choose a few practices to start with and gradually incorporate more as you feel comfortable.
            </p>
          </>
        ) : (
          <p className="text-gray-700">
            No specific recommendations based on your answers at this time. Your energy centers appear balanced! Keep exploring and tuning in.
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Close Plan
        </button>
      </div>
    </div>
  );
};

export default RecommendationsModal;