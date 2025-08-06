import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

const ChakraQuestionnaire = ({ onComplete, onSkip }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState({});

  const questions = [
    {
      chakra: 'root',
      name: 'Root Chakra Assessment',
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-red-50',
      description: 'Foundation, Security & Grounding',
      questions: [
        {
          id: 'financial_security',
          question: 'How secure do you feel about your financial situation?',
          options: [
            { value: 1, label: 'Very insecure, constant worry about money' },
            { value: 2, label: 'Often worried about financial stability' },
            { value: 3, label: 'Somewhat stable but occasional concerns' },
            { value: 4, label: 'Generally secure with minor worries' },
            { value: 5, label: 'Very secure and confident about finances' }
          ]
        },
        {
          id: 'physical_safety',
          question: 'How safe do you feel in your living environment?',
          options: [
            { value: 1, label: 'Very unsafe, constant anxiety about safety' },
            { value: 2, label: 'Often feel unsafe or threatened' },
            { value: 3, label: 'Neutral, some safety concerns' },
            { value: 4, label: 'Generally feel safe and secure' },
            { value: 5, label: 'Completely safe and grounded' }
          ]
        },
        {
          id: 'basic_needs',
          question: 'How well are your basic needs (food, shelter, healthcare) met?',
          options: [
            { value: 1, label: 'Struggling to meet basic needs' },
            { value: 2, label: 'Basic needs met but with difficulty' },
            { value: 3, label: 'Adequate but not abundant' },
            { value: 4, label: 'Well met with some comfort' },
            { value: 5, label: 'Abundantly met without concern' }
          ]
        },
        {
          id: 'family_support',
          question: 'How connected do you feel to your family/ancestral roots?',
          options: [
            { value: 1, label: 'Completely disconnected or traumatized' },
            { value: 2, label: 'Weak or troubled family connections' },
            { value: 3, label: 'Neutral, some connection but distant' },
            { value: 4, label: 'Strong, supportive family bonds' },
            { value: 5, label: 'Deep, nurturing ancestral connection' }
          ]
        }
      ]
    },
    {
      chakra: 'sacral',
      name: 'Sacral Chakra Assessment',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Creativity, Sexuality & Emotions',
      questions: [
        {
          id: 'creativity_expression',
          question: 'How freely do you express your creativity?',
          options: [
            { value: 1, label: 'Completely blocked, no creative expression' },
            { value: 2, label: 'Rarely express creativity, feel blocked' },
            { value: 3, label: 'Occasional creative expression' },
            { value: 4, label: 'Regular creative activities and expression' },
            { value: 5, label: 'Constant creative flow and inspiration' }
          ]
        },
        {
          id: 'emotional_expression',
          question: 'How comfortable are you expressing emotions?',
          options: [
            { value: 1, label: 'Completely shut down emotionally' },
            { value: 2, label: 'Struggle to express or feel emotions' },
            { value: 3, label: 'Sometimes express emotions, sometimes not' },
            { value: 4, label: 'Generally comfortable with emotions' },
            { value: 5, label: 'Healthy, fluid emotional expression' }
          ]
        },
        {
          id: 'intimate_relationships',
          question: 'How fulfilling are your intimate relationships?',
          options: [
            { value: 1, label: 'Avoid intimacy or have toxic relationships' },
            { value: 2, label: 'Struggle with intimacy and connection' },
            { value: 3, label: 'Average intimacy, some challenges' },
            { value: 4, label: 'Generally healthy intimate connections' },
            { value: 5, label: 'Deep, fulfilling intimate relationships' }
          ]
        },
        {
          id: 'pleasure_guilt',
          question: 'How do you relate to pleasure and enjoyment?',
          options: [
            { value: 1, label: 'Feel guilty about pleasure, deny enjoyment' },
            { value: 2, label: 'Often feel guilty about enjoying life' },
            { value: 3, label: 'Mixed feelings about pleasure' },
            { value: 4, label: 'Generally comfortable with healthy pleasure' },
            { value: 5, label: 'Embrace pleasure as sacred and natural' }
          ]
        }
      ]
    },
    {
      chakra: 'solarPlexus',
      name: 'Solar Plexus Assessment',
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Personal Power & Confidence',
      questions: [
        {
          id: 'self_confidence',
          question: 'How confident do you feel in making decisions?',
          options: [
            { value: 1, label: 'Completely lack confidence, always doubt myself' },
            { value: 2, label: 'Often doubt my decisions and abilities' },
            { value: 3, label: 'Sometimes confident, sometimes not' },
            { value: 4, label: 'Generally confident in my choices' },
            { value: 5, label: 'Strong confidence and trust in myself' }
          ]
        },
        {
          id: 'personal_power',
          question: 'How empowered do you feel in your life?',
          options: [
            { value: 1, label: 'Feel completely powerless and victimized' },
            { value: 2, label: 'Often feel powerless or controlled by others' },
            { value: 3, label: 'Sometimes empowered, sometimes not' },
            { value: 4, label: 'Generally feel empowered and in control' },
            { value: 5, label: 'Strong sense of personal power and agency' }
          ]
        },
        {
          id: 'boundaries',
          question: 'How well do you maintain healthy boundaries?',
          options: [
            { value: 1, label: 'No boundaries, people walk all over me' },
            { value: 2, label: 'Weak boundaries, often taken advantage of' },
            { value: 3, label: 'Inconsistent boundaries' },
            { value: 4, label: 'Generally maintain healthy boundaries' },
            { value: 5, label: 'Strong, clear, and healthy boundaries' }
          ]
        },
        {
          id: 'self_worth',
          question: 'How do you feel about your self-worth and value?',
          options: [
            { value: 1, label: 'Feel worthless and inadequate' },
            { value: 2, label: 'Often struggle with low self-worth' },
            { value: 3, label: 'Average self-worth with ups and downs' },
            { value: 4, label: 'Generally feel worthy and valuable' },
            { value: 5, label: 'Strong sense of inherent self-worth' }
          ]
        }
      ]
    },
    {
      chakra: 'heart',
      name: 'Heart Chakra Assessment',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      description: 'Love, Compassion & Connection',
      questions: [
        {
          id: 'self_love',
          question: 'How much compassion do you have for yourself?',
          options: [
            { value: 1, label: 'Extremely self-critical, no self-compassion' },
            { value: 2, label: 'Often harsh on myself, little self-love' },
            { value: 3, label: 'Sometimes kind to myself' },
            { value: 4, label: 'Generally practice self-compassion' },
            { value: 5, label: 'Deep, unconditional self-love and acceptance' }
          ]
        },
        {
          id: 'forgiveness',
          question: 'How easily can you forgive others and yourself?',
          options: [
            { value: 1, label: 'Hold grudges, cannot forgive' },
            { value: 2, label: 'Struggle greatly with forgiveness' },
            { value: 3, label: 'Sometimes can forgive, sometimes not' },
            { value: 4, label: 'Generally able to forgive with time' },
            { value: 5, label: 'Easily forgive and release resentment' }
          ]
        },
        {
          id: 'relationships',
          question: 'How fulfilling are your close relationships?',
          options: [
            { value: 1, label: 'Isolated, no close relationships' },
            { value: 2, label: 'Relationships are often difficult or painful' },
            { value: 3, label: 'Some good relationships, some challenges' },
            { value: 4, label: 'Generally healthy, supportive relationships' },
            { value: 5, label: 'Deep, loving, mutually supportive connections' }
          ]
        },
        {
          id: 'compassion_others',
          question: 'How easily do you feel compassion for others?',
          options: [
            { value: 1, label: 'Feel judgmental and closed-hearted' },
            { value: 2, label: 'Struggle to feel compassion for others' },
            { value: 3, label: 'Sometimes compassionate, sometimes not' },
            { value: 4, label: 'Generally feel compassion for others' },
            { value: 5, label: 'Natural, flowing compassion for all beings' }
          ]
        }
      ]
    },
    {
      chakra: 'throat',
      name: 'Throat Chakra Assessment',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Truth, Communication & Expression',
      questions: [
        {
          id: 'authentic_expression',
          question: 'How authentically do you express yourself?',
          options: [
            { value: 1, label: 'Never express my true self, wear masks' },
            { value: 2, label: 'Rarely authentic, fear judgment' },
            { value: 3, label: 'Sometimes authentic, sometimes not' },
            { value: 4, label: 'Generally express myself authentically' },
            { value: 5, label: 'Always authentic, true to myself' }
          ]
        },
        {
          id: 'speaking_truth',
          question: 'How comfortable are you speaking your truth?',
          options: [
            { value: 1, label: 'Never speak up, avoid conflict at all costs' },
            { value: 2, label: 'Rarely speak my truth, fear confrontation' },
            { value: 3, label: 'Sometimes speak up, sometimes stay silent' },
            { value: 4, label: 'Generally comfortable speaking my truth' },
            { value: 5, label: 'Always speak truth with love and courage' }
          ]
        },
        {
          id: 'listening_skills',
          question: 'How well do you listen to others?',
          options: [
            { value: 1, label: 'Poor listener, always thinking of my response' },
            { value: 2, label: 'Often distracted when others speak' },
            { value: 3, label: 'Sometimes listen well, sometimes not' },
            { value: 4, label: 'Generally a good listener' },
            { value: 5, label: 'Excellent listener, fully present' }
          ]
        },
        {
          id: 'creative_voice',
          question: 'How much do you use your voice creatively (singing, writing, etc.)?',
          options: [
            { value: 1, label: 'Never use my voice creatively' },
            { value: 2, label: 'Rarely engage in creative expression' },
            { value: 3, label: 'Occasional creative voice expression' },
            { value: 4, label: 'Regular creative use of voice/expression' },
            { value: 5, label: 'Constant creative expression and communication' }
          ]
        }
      ]
    },
    {
      chakra: 'thirdEye',
      name: 'Third Eye Assessment',
      color: 'from-indigo-400 to-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Intuition, Wisdom & Insight',
      questions: [
        {
          id: 'intuitive_trust',
          question: 'How much do you trust your intuition?',
          options: [
            { value: 1, label: 'Never trust intuition, only logic' },
            { value: 2, label: 'Rarely trust my inner knowing' },
            { value: 3, label: 'Sometimes trust intuition' },
            { value: 4, label: 'Generally trust my intuitive insights' },
            { value: 5, label: 'Complete trust in intuitive guidance' }
          ]
        },
        {
          id: 'mental_clarity',
          question: 'How clear is your thinking and mental focus?',
          options: [
            { value: 1, label: 'Mind is foggy, confused, overwhelmed' },
            { value: 2, label: 'Often experience mental confusion' },
            { value: 3, label: 'Sometimes clear, sometimes confused' },
            { value: 4, label: 'Generally have clear thinking' },
            { value: 5, label: 'Sharp mental clarity and focus' }
          ]
        },
        {
          id: 'spiritual_insight',
          question: 'How often do you experience spiritual insights or "aha" moments?',
          options: [
            { value: 1, label: 'Never have spiritual insights' },
            { value: 2, label: 'Rarely experience deeper understanding' },
            { value: 3, label: 'Occasional spiritual insights' },
            { value: 4, label: 'Regular moments of deeper understanding' },
            { value: 5, label: 'Frequent profound spiritual insights' }
          ]
        },
        {
          id: 'imagination_dreams',
          question: 'How active are your imagination and dream life?',
          options: [
            { value: 1, label: 'No imagination, no dream recall' },
            { value: 2, label: 'Limited imagination and dream life' },
            { value: 3, label: 'Average imagination and occasional dreams' },
            { value: 4, label: 'Active imagination and dream life' },
            { value: 5, label: 'Rich, vivid imagination and dreams' }
          ]
        }
      ]
    },
    {
      chakra: 'crown',
      name: 'Crown Chakra Assessment',
      color: 'from-violet-400 to-violet-600',
      bgColor: 'bg-violet-50',
      description: 'Spirituality, Unity & Transcendence',
      questions: [
        {
          id: 'spiritual_connection',
          question: 'How connected do you feel to something greater than yourself?',
          options: [
            { value: 1, label: 'Feel completely disconnected from the divine' },
            { value: 2, label: 'Little spiritual connection or faith' },
            { value: 3, label: 'Some spiritual connection but inconsistent' },
            { value: 4, label: 'Generally feel spiritually connected' },
            { value: 5, label: 'Deep, constant spiritual connection' }
          ]
        },
        {
          id: 'life_purpose',
          question: 'How clear are you about your life\'s purpose and meaning?',
          options: [
            { value: 1, label: 'Life feels meaningless and purposeless' },
            { value: 2, label: 'Often feel lost and without direction' },
            { value: 3, label: 'Some sense of purpose but unclear' },
            { value: 4, label: 'Generally clear about life purpose' },
            { value: 5, label: 'Crystal clear life mission and meaning' }
          ]
        },
        {
          id: 'transcendent_experiences',
          question: 'How often do you experience states of transcendence or unity?',
          options: [
            { value: 1, label: 'Never experience transcendent states' },
            { value: 2, label: 'Rarely if ever feel transcendent' },
            { value: 3, label: 'Occasional moments of transcendence' },
            { value: 4, label: 'Regular transcendent experiences' },
            { value: 5, label: 'Frequent states of unity and transcendence' }
          ]
        },
        {
          id: 'wisdom_understanding',
          question: 'How much do you feel you understand about life and existence?',
          options: [
            { value: 1, label: 'Feel completely ignorant about life\'s mysteries' },
            { value: 2, label: 'Limited understanding of deeper truths' },
            { value: 3, label: 'Some wisdom but still seeking answers' },
            { value: 4, label: 'Good understanding of life\'s deeper meaning' },
            { value: 5, label: 'Deep wisdom and understanding of existence' }
          ]
        }
      ]
    }
  ];

  const handleResponse = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const nextSection = () => {
    if (currentSection < questions.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      calculateInitialValues();
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const calculateInitialValues = () => {
    const initialValues = {};

    questions.forEach(section => {
      const chakraResponses = section.questions.map(q => responses[q.id] || 3);
      const avgResponse = chakraResponses.reduce((sum, val) => sum + val, 0) / chakraResponses.length;
      
      // Convert 1-5 scale to chakra values
      // Higher response = higher frequency/balance, lower blockage
      const frequency = Math.round((avgResponse - 1) * 20 + 20); // 20-100
      const balance = Math.round((avgResponse - 1) * 20 + 20);   // 20-100
      const blockage = Math.round((6 - avgResponse) * 15 + 10);  // 85-25 (inverted)
      
      initialValues[section.chakra] = {
        frequency: Math.min(100, Math.max(0, frequency)),
        balance: Math.min(100, Math.max(0, balance)),
        blockage: Math.min(100, Math.max(0, blockage))
      };
    });

    onComplete(initialValues);
  };

  const currentQ = questions[currentSection];
  const progress = ((currentSection + 1) / questions.length) * 100;
  const isComplete = Object.keys(responses).length >= questions.reduce((sum, section) => sum + section.questions.length, 0);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Chakra Assessment Questionnaire
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Answer these questions honestly to receive personalized starting values for your energy centers. This will give you a more accurate spiritual profile.
          </p>
          
          {/* Progress */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Section {currentSection + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Skip Option */}
          <Button variant="ghost" onClick={onSkip} className="text-gray-500">
            Skip questionnaire and use default values
          </Button>
        </div>

        {/* Current Section */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className={`text-2xl text-center bg-gradient-to-r ${currentQ.color} bg-clip-text text-transparent flex items-center justify-center gap-3`}>
              <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${currentQ.color}`}></div>
              {currentQ.name}
            </CardTitle>
            <p className="text-center text-gray-600">{currentQ.description}</p>
          </CardHeader>
          
          <CardContent className={`${currentQ.bgColor} p-8 space-y-8`}>
            {currentQ.questions.map((question, qIndex) => (
              <div key={question.id} className="space-y-4">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {qIndex + 1}. {question.question}
                </h3>
                
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-start p-4 rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                        responses[question.id] === option.value
                          ? 'bg-white border-2 border-indigo-300 shadow-sm'
                          : 'bg-white/50 border border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={responses[question.id] === option.value}
                        onChange={() => handleResponse(question.id, option.value)}
                        className="mr-3 mt-1 accent-indigo-600"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={prevSection}
            disabled={currentSection === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="text-sm text-gray-600">
            {Object.keys(responses).filter(key => 
              currentQ.questions.some(q => q.id === key && responses[key])
            ).length} of {currentQ.questions.length} answered
          </div>

          <Button
            onClick={nextSection}
            disabled={!currentQ.questions.every(q => responses[q.id])}
            className="flex items-center gap-2"
          >
            {currentSection === questions.length - 1 ? (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Profile
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChakraQuestionnaire;