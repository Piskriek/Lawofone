// Mock data generator for spiritual profiles

export const generateProfile = (energyCenters) => {
  // Calculate overall statistics
  const calculateOverallBalance = () => {
    const allCenters = Object.values(energyCenters);
    const totalBalance = allCenters.reduce((sum, center) => sum + center.balance, 0);
    return Math.round(totalBalance / allCenters.length);
  };

  const calculateOverallLevel = () => {
    const allCenters = Object.values(energyCenters);
    const averageFreq = allCenters.reduce((sum, center) => sum + center.frequency, 0) / allCenters.length;
    const averageBalance = allCenters.reduce((sum, center) => sum + center.balance, 0) / allCenters.length;
    const averageBlockage = allCenters.reduce((sum, center) => sum + center.blockage, 0) / allCenters.length;
    
    const level = (averageFreq + averageBalance - averageBlockage) / 2;
    
    if (level >= 80) return 'Advanced Seeker';
    if (level >= 60) return 'Developing Soul';
    if (level >= 40) return 'Awakening Spirit';
    return 'Beginning Journey';
  };

  const findDominantChakra = () => {
    const chakraNames = {
      root: 'Root Dominant',
      sacral: 'Sacral Dominant', 
      solarPlexus: 'Solar Dominant',
      heart: 'Heart Dominant',
      throat: 'Throat Dominant',
      thirdEye: 'Third Eye Dominant',
      crown: 'Crown Dominant'
    };

    let highestScore = 0;
    let dominantChakra = 'root';

    Object.entries(energyCenters).forEach(([key, center]) => {
      const score = center.frequency + center.balance - center.blockage;
      if (score > highestScore) {
        highestScore = score;
        dominantChakra = key;
      }
    });

    return chakraNames[dominantChakra];
  };

  // Generate personality traits based on energy centers
  const generatePersonalityTraits = () => {
    const traits = [];
    const behaviors = [];

    // Root chakra influence
    if (energyCenters.root.frequency > 60) {
      traits.push('You have a strong foundation and feel secure in your physical existence.');
      behaviors.push('You approach challenges with practical wisdom and grounded thinking.');
    } else if (energyCenters.root.blockage > 50) {
      traits.push('You may struggle with feelings of insecurity or survival fears.');
      behaviors.push('You tend to worry about basic needs and material security.');
    }

    // Sacral chakra influence  
    if (energyCenters.sacral.frequency > 60) {
      traits.push('You express creativity freely and maintain healthy emotional boundaries.');
      behaviors.push('You embrace pleasure and intimacy with balanced enthusiasm.');
    } else if (energyCenters.sacral.blockage > 50) {
      traits.push('You may experience creative blocks or emotional numbness.');
      behaviors.push('You might avoid emotional intimacy or struggle with guilt around pleasure.');
    }

    // Solar Plexus influence
    if (energyCenters.solarPlexus.frequency > 60) {
      traits.push('You possess strong personal power and confident self-expression.');
      behaviors.push('You take initiative and make decisions with clarity and purpose.');
    } else if (energyCenters.solarPlexus.blockage > 50) {
      traits.push('You may struggle with low self-esteem or feelings of powerlessness.');
      behaviors.push('You tend to second-guess yourself and avoid taking leadership roles.');
    }

    // Heart chakra influence
    if (energyCenters.heart.frequency > 60) {
      traits.push('You radiate love and compassion, creating harmonious relationships.');
      behaviors.push('You offer support to others naturally and practice forgiveness easily.');
    } else if (energyCenters.heart.blockage > 50) {
      traits.push('You may have difficulty trusting others or expressing love freely.');
      behaviors.push('You tend to build walls to protect yourself from emotional hurt.');
    }

    // Throat chakra influence
    if (energyCenters.throat.frequency > 60) {
      traits.push('You communicate truth with clarity and express yourself authentically.');
      behaviors.push('You speak up for your beliefs and listen actively to others.');
    } else if (energyCenters.throat.blockage > 50) {
      traits.push('You may struggle to express your truth or fear being judged.');
      behaviors.push('You tend to remain silent when you should speak up.');
    }

    // Third Eye influence
    if (energyCenters.thirdEye.frequency > 60) {
      traits.push('You possess strong intuition and see beyond surface appearances.');
      behaviors.push('You trust your inner wisdom and make decisions from deep knowing.');
    } else if (energyCenters.thirdEye.blockage > 50) {
      traits.push('You may struggle with confusion or difficulty accessing intuitive insights.');
      behaviors.push('You tend to overthink and rely too heavily on logical analysis.');
    }

    // Crown chakra influence
    if (energyCenters.crown.frequency > 60) {
      traits.push('You feel connected to universal consciousness and divine purpose.');
      behaviors.push('You seek meaning through spiritual practice and service to others.');
    } else if (energyCenters.crown.blockage > 50) {
      traits.push('You may feel spiritually disconnected or question life\'s greater purpose.');
      behaviors.push('You tend to focus only on material concerns and dismiss spiritual matters.');
    }

    return {
      traits: traits.slice(0, 4), // Limit to 4 most relevant traits
      behaviors: behaviors.slice(0, 3) // Limit to 3 most relevant behaviors
    };
  };

  // Generate spiritual development insights
  const generateSpiritualInsights = () => {
    const overallBalance = calculateOverallBalance();
    const level = calculateOverallLevel();

    const insights = [];

    if (overallBalance > 70) {
      insights.push('Your energy centers show remarkable harmony, indicating advanced spiritual development.');
      insights.push('You have integrated many of your lessons and serve as a beacon for others.');
    } else if (overallBalance > 50) {
      insights.push('You are making steady progress on your spiritual journey with growing awareness.');
      insights.push('Continue working on balancing your energy centers for deeper insights.');
    } else {
      insights.push('You are at the beginning of a beautiful spiritual awakening.');
      insights.push('Focus on healing and opening your energy centers gradually and lovingly.');
    }

    // Add level-specific insights
    if (level.includes('Advanced')) {
      insights.push('You may be called to teach or guide others on their spiritual paths.');
    } else if (level.includes('Developing')) {
      insights.push('This is an excellent time to deepen your meditation and self-reflection practices.');
    } else {
      insights.push('Begin with simple mindfulness practices and gentle energy work.');
    }

    return {
      level: `You are currently at the "${level}" stage of spiritual development. This indicates your readiness for specific types of growth and service.`,
      insights: insights.slice(0, 3)
    };
  };

  // Generate healing recommendations
  const generateHealingPractices = () => {
    const practices = [];
    const growthAreas = [];

    // Find the most blocked chakra
    let mostBlocked = 'root';
    let highestBlockage = 0;
    
    Object.entries(energyCenters).forEach(([key, center]) => {
      if (center.blockage > highestBlockage) {
        highestBlockage = center.blockage;
        mostBlocked = key;
      }
    });

    // General practices based on overall state
    const overallBalance = calculateOverallBalance();
    if (overallBalance < 50) {
      practices.push('Begin each day with 10 minutes of grounding meditation to stabilize your energy.');
      practices.push('Practice deep breathing exercises to clear energetic blockages.');
    } else {
      practices.push('Maintain your progress with daily energy alignment practices.');
      practices.push('Consider energy healing modalities like Reiki or crystal work.');
    }

    // Specific recommendations based on most blocked chakra
    const chakraHealing = {
      root: {
        practice: 'Spend time in nature, practice yoga poses like child\'s pose and mountain pose.',
        growth: 'Work on building financial security and stable relationships.'
      },
      sacral: {
        practice: 'Engage in creative activities, dance, and practice hip-opening yoga poses.',
        growth: 'Explore healthy expressions of sexuality and emotional intimacy.'
      },
      solarPlexus: {
        practice: 'Practice power poses, affirmations, and core-strengthening exercises.',
        growth: 'Develop leadership skills and practice setting healthy boundaries.'
      },
      heart: {
        practice: 'Practice loving-kindness meditation and heart-opening yoga poses.',
        growth: 'Work on forgiveness practices and opening to deeper relationships.'
      },
      throat: {
        practice: 'Practice chanting, singing, or journaling to express your truth.',
        growth: 'Work on authentic communication and creative self-expression.'
      },
      thirdEye: {
        practice: 'Practice meditation, visualization, and dream work to enhance intuition.',
        growth: 'Develop psychic abilities and trust in your inner knowing.'
      },
      crown: {
        practice: 'Engage in prayer, meditation, and study of spiritual texts.',
        growth: 'Explore your connection to the divine and life\'s greater purpose.'
      }
    };

    if (chakraHealing[mostBlocked]) {
      practices.push(chakraHealing[mostBlocked].practice);
      growthAreas.push(chakraHealing[mostBlocked].growth);
    }

    // Add universal growth recommendations
    growthAreas.push('Continue regular spiritual practice to maintain and deepen your growth.');
    growthAreas.push('Consider working with a spiritual teacher or joining a like-minded community.');

    return {
      practices: practices.slice(0, 3),
      growthAreas: growthAreas.slice(0, 3)
    };
  };

  const personality = generatePersonalityTraits();
  const spiritual = generateSpiritualInsights();
  const healing = generateHealingPractices();

  return {
    overallLevel: calculateOverallLevel(),
    overallBalance: calculateOverallBalance(),
    dominantChakra: findDominantChakra(),
    personality,
    spiritual,
    healing
  };
};