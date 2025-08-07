import React, { useState } from 'react';

const BlockageQuestionnaire = ({ onComplete }) => {
  const [answers, setAnswers] = useState({});

  const questions = [
    // Root Chakra (Muladhara) - Red
    {
      id: 'root-security-money',
      chakra: 'Root Chakra',
      text: 'Do you worry excessively about money or financial security?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-red-600', // Chakra color class
    },
    {
      id: 'root-security-safety',
      chakra: 'Root Chakra',
      text: 'Do you feel unsafe or vulnerable in your environment?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-red-600',
    },
    {
      id: 'root-stability-grounded',
      chakra: 'Root Chakra',
      text: 'Do you feel ungrounded or disconnected from your body?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-red-600',
    },
    {
      id: 'root-stability-belonging',
      chakra: 'Root Chakra',
      text: 'Do you struggle with a sense of belonging or feeling at home?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-red-600',
    },

    // Sacral Chakra (Svadhisthana) - Orange
    {
      id: 'sacral-creativity-expression',
      chakra: 'Sacral Chakra',
      text: 'Do you have difficulty expressing your creativity?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-orange-600', // Chakra color class
    },
    {
      id: 'sacral-emotions-flow',
      chakra: 'Sacral Chakra',
      text: 'Do you suppress your emotions or find it hard to feel them fully?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-orange-600',
    },
    {
      id: 'sacral-pleasure-intimacy',
      chakra: 'Sacral Chakra',
      text: 'Do you struggle with intimacy or experiencing pleasure?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-orange-600',
    },
    {
      id: 'sacral-pleasure-guilt',
      chakra: 'Sacral Chakra',
      text: 'Do you feel guilty or ashamed about pleasure?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-orange-600',
    },

    // Solar Plexus Chakra (Manipura) - Yellow
    {
      id: 'solar-power-selfesteem',
      chakra: 'Solar Plexus Chakra',
      text: 'Do you have low self-esteem or lack confidence?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-yellow-600', // Chakra color class
    },
    {
      id: 'solar-power-willpower',
      chakra: 'Solar Plexus Chakra',
      text: 'Do you struggle with willpower or taking action?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-yellow-600',
    },
    {
      id: 'solar-control-need',
      chakra: 'Solar Plexus Chakra',
      text: 'Do you feel a strong need to control situations or people?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-yellow-600',
    },
    {
      id: 'solar-control-anger',
      chakra: 'Solar Plexus Chakra',
      text: 'Do you experience frequent anger or frustration?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-yellow-600',
    },

    // Heart Chakra (Anahata) - Green
    {
      id: 'heart-love-giving',
      chakra: 'Heart Chakra',
      text: 'Do you find it hard to give love or compassion to yourself or others?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-green-600', // Chakra color class
    },
    {
      id: 'heart-love-receiving',
      chakra: 'Heart Chakra',
      text: 'Do you find it hard to receive love or affection?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-green-600',
    },
    {
      id: 'heart-connection-isolation',
      chakra: 'Heart Chakra',
      text: 'Do you feel isolated or disconnected from others?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-green-600',
    },
    {
      id: 'heart-connection-trust',
      chakra: 'Heart Chakra',
      text: 'Do you have difficulty trusting others?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-green-600',
    },

    // Throat Chakra (Vishuddha) - Blue
    {
      id: 'throat-expression-truth',
      chakra: 'Throat Chakra',
      text: 'Do you find it difficult to speak your truth or express yourself honestly?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-blue-600', // Chakra color class
    },
    {
      id: 'throat-expression-fear',
      chakra: 'Throat Chakra',
      text: 'Do you fear judgment or criticism when expressing yourself?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-blue-600',
    },
    {
      id: 'throat-listening-difficulty',
      chakra: 'Throat Chakra',
      text: 'Do you struggle to listen to others or receive feedback?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-blue-600',
    },
    {
      id: 'throat-listening-interrupting',
      chakra: 'Throat Chakra',
      text: 'Do you tend to interrupt others when they are speaking?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-blue-600',
    },

    // Third Eye Chakra (Ajna) - Indigo
    {
      id: 'third-intuition-trust',
      chakra: 'Third Eye Chakra',
      text: 'Do you struggle to trust your intuition or inner guidance?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-indigo-600', // Chakra color class
    },
    {
      id: 'third-intuition-dreams',
      chakra: 'Third Eye Chakra',
      text: 'Do you have difficulty remembering or understanding your dreams?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-indigo-600',
    },
    {
      id: 'third-clarity-direction',
      chakra: 'Third Eye Chakra',
      text: 'Do you lack clarity or feel unsure about your life path?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-indigo-600',
    },
    {
      id: 'third-clarity-vision',
      chakra: 'Third Eye Chakra',
      text: 'Do you struggle with visualization or creative imagination?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-indigo-600',
    },

    // Crown Chakra (Sahasrara) - Violet
    {
      id: 'crown-connection-spiritual',
      chakra: 'Crown Chakra',
      text: 'Do you feel disconnected from a higher power or spiritual source?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-purple-600', // Chakra color class
    },
    {
      id: 'crown-connection-purpose',
      chakra: 'Crown Chakra',
      text: 'Do you question your life\'s purpose or feel a lack of meaning?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-purple-600',
    },
    {
      id: 'crown-awareness-present',
      chakra: 'Crown Chakra',
      text: 'Do you have difficulty being present in the moment?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-purple-600',
    },
    {
      id: 'crown-awareness-oneness',
      chakra: 'Crown Chakra',
      text: 'Do you struggle to feel a sense of connection to all things?',
      options: ['Rarely', 'Sometimes', 'Often', 'Very Often'],
      color: 'text-purple-600',
    },
  ];

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    const recommendations = {};
    const chakraBlockageScore = {};

    // Calculate a blockage score for each chakra
    questions.forEach((q) => {
      if (!chakraBlockageScore[q.chakra]) {
        chakraBlockageScore[q.chakra] = 0;
      }
      if (answers[q.id] === 'Sometimes') {
        chakraBlockageScore[q.chakra] += 1;
      } else if (answers[q.id] === 'Often') {
        chakraBlockageScore[q.chakra] += 2;
      } else if (answers[q.id] === 'Very Often') {
        chakraBlockageScore[q.chakra] += 3;
      }
    });

    // Provide tiered recommendations and variety of practices based on blockage score
    for (const chakra in chakraBlockageScore) {
      if (chakraBlockageScore[chakra] > 0) {
        if (!recommendations[chakra]) {
          recommendations[chakra] = [];
        }

        // Basic recommendations for any blockage
        recommendations[chakra].push(`Focus on practices to balance your ${chakra}.`);

        if (chakraBlockageScore[chakra] >= 4) { // Threshold for significant blockage (adjust as needed)
          recommendations[chakra].push(`Consider deeper exploration and dedicated practices for ${chakra} healing.`);
        }

        // Add specific and varied recommendations based on chakra and potential severity
        if (chakra === 'Root Chakra') {
          if (chakraBlockageScore[chakra] >= 1) recommendations[chakra].push('Meditate on the color red or the Muladhara mantra LAM.');
          if (chakraBlockageScore[chakra] >= 2) recommendations[chakra].push('Engage in grounding activities like walking in nature, gardening, or yoga poses such as Mountain Pose or Warrior I.');
          if (chakraBlockageScore[chakra] >= 3) recommendations[chakra].push('Use grounding crystals like Red Jasper, Black Tourmaline, or Hematite.');
          if (chakraBlockageScore[chakra] >= 4) recommendations[chakra].push('Explore journaling about your sense of safety, security, and belonging.');
          if (chakraBlockageScore[chakra] >= 5) recommendations[chakra].push('Consider working with a therapist to address deep-seated fears or insecurities.');
        } else if (chakra === 'Sacral Chakra') {
          if (chakraBlockageScore[chakra] >= 1) recommendations[chakra].push('Meditate on the color orange or the Svadhisthana mantra VAM.');
          if (chakraBlockageScore[chakra] >= 2) recommendations[chakra].push('Engage in creative activities like painting, drawing, writing, or playing music.');
          if (chakraBlockageScore[chakra] >= 3) recommendations[chakra].push('Practice mindful movement or dance to connect with your body and emotions.');
          if (chakraBlockageScore[chakra] >= 4) recommendations[chakra].push('Use sacral chakra crystals like Carnelian, Orange Calcite, or Sunstone.');
          if (chakraBlockageScore[chakra] >= 5) recommendations[chakra].push('Explore healthy expressions of sensuality and pleasure without guilt.');
        } else if (chakra === 'Solar Plexus Chakra') {
          if (chakraBlockageScore[chakra] >= 1) recommendations[chakra].push('Meditate on the color yellow or the Manipura mantra RAM.');
          if (chakraBlockageScore[chakra] >= 2) recommendations[chakra].push('Practice affirmations for self-esteem and personal power.');
          if (chakraBlockageScore[chakra] >= 3) recommendations[chakra].push('Engage in core-strengthening exercises or yoga poses like Boat Pose or Warrior III.');
          if (chakraBlockageScore[chakra] >= 4) recommendations[chakra].push('Use solar plexus crystals like Citrine, Tiger\'s Eye, or Yellow Jasper.');
          if (chakraBlockageScore[chakra] >= 5) recommendations[chakra].push('Work with a coach or therapist to address control issues, boundaries, and assertiveness.');
        } else if (chakra === 'Heart Chakra') {
          if (chakraBlockageScore[chakra] >= 1) recommendations[chakra].push('Meditate on the color green or the Anahata mantra YAM.');
          if (chakraBlockageScore[chakra] >= 2) recommendations[chakra].push('Practice loving-kindness meditation towards yourself and others.');
          if (chakraBlockageScore[chakra] >= 3) recommendations[chakra].push('Engage in acts of service and compassion.');
          if (chakraBlockageScore[chakra] >= 4) recommendations[chakra].push('Use heart chakra crystals like Rose Quartz, Green Aventurine, or Emerald.');
          if (chakraBlockageScore[chakra] >= 5) recommendations[chakra].push('Explore forgiveness practices for deep emotional healing and releasing grudges.');
        } else if (chakra === 'Throat Chakra') {
          if (chakraBlockageScore[chakra] >= 1) recommendations[chakra].push('Meditate on the color blue or the Vishuddha mantra HAM.');
          if (chakraBlockageScore[chakra] >= 2) recommendations[chakra].push('Practice vocal exercises, singing, chanting, or humming.');
          if (chakraBlockageScore[chakra] >= 3) recommendations[chakra].push('Journaling or writing down your thoughts and feelings.');
          if (chakraBlockageScore[chakra] >= 4) recommendations[chakra].push('Practice mindful listening and assertive, honest communication.');
          if (chakraBlockageScore[chakra] >= 5) recommendations[chakra].push('Consider working with a speech therapist or communication coach.');
        } else if (chakra === 'Third Eye Chakra') {
          if (chakraBlockageScore[chakra] >= 1) recommendations[chakra].push('Meditate on the color indigo or the Ajna mantra OM.');
          if (chakraBlockageScore[chakra] >= 2) recommendations[chakra].push('Engage in meditation and mindfulness practices to quiet the mind.');
          if (chakraBlockageScore[chakra] >= 3) recommendations[chakra].push('Pay attention to your dreams, synchronicities, and intuitive nudges.');
          if (chakraBlockageScore[chakra] >= 4) recommendations[chakra].push('Use third eye crystals like Amethyst, Lapis Lazuli, or Sodalite.');
          if (chakraBlockageScore[chakra] >= 5) recommendations[chakra].push('Explore practices like visualization and creative imagination exercises.');
        } else if (chakra === 'Crown Chakra') {
          if (chakraBlockageScore[chakra] >= 1) recommendations[chakra].push('Meditate on the color violet or white, or the Sahasrara mantra OM.');
          if (chakraBlockageScore[chakra] >= 2) recommendations[chakra].push('Engage in spiritual practices such as meditation, prayer, or contemplation.');
          if (chakraBlockageScore[chakra] >= 3) recommendations[chakra].push('Spend time in nature and cultivate a sense of awe and wonder.');
          if (chakraBlockageScore[chakra] >= 4) recommendations[chakra].push('Seek knowledge and wisdom from spiritual texts or teachers.');
          if (chakraBlockageScore[chakra] >= 5) recommendations[chakra].push('Practice being present in the moment and cultivating a sense of oneness.');
        }
      }
    }


    onComplete(recommendations);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="p-8 border w-full max-w-md shadow-lg rounded-md bg-white">
        <h2 className="text-2xl font-semibold mb-6 text-center">Energy Center Questionnaire</h2>

        {/* Chakra color indicators and improved layout */}
        {questions.map((q) => (
          <div key={q.id} className="mb-6 p-4 border rounded-md shadow-sm bg-gray-50">
            <p className={`mb-3 text-lg font-medium ${q.color}`}>{q.text}</p>
            <div className="flex flex-wrap gap-3">
              {q.options.map((option) => (
                <label key={option} className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={q.id}
                    value={option}
                    checked={answers[q.id] === option}
                    onChange={() => handleAnswerChange(q.id, option)}
                    className={`form-radio h-5 w-5 ${q.color.replace('text-', 'text-')}-600 transition duration-150 ease-in-out`}
                  />
                  <span className="ml-2 text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-6 w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Get Recommendations
        </button>
      </div>
    </div>
  );
};

export default BlockageQuestionnaire;