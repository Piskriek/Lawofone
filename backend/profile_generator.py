# Profile Generator - Backend Logic for Law of One Spiritual Profiles

def generate_spiritual_profile(energy_centers):
    """
    Generate comprehensive spiritual profile based on energy center values
    """
    
    # Calculate overall statistics
    def calculate_overall_balance():
        all_centers = list(energy_centers.values())
        total_balance = sum(center['balance'] for center in all_centers)
        return round(total_balance / len(all_centers))

    def calculate_overall_level():
        all_centers = list(energy_centers.values())
        average_freq = sum(center['frequency'] for center in all_centers) / len(all_centers)
        average_balance = sum(center['balance'] for center in all_centers) / len(all_centers)
        average_blockage = sum(center['blockage'] for center in all_centers) / len(all_centers)
        
        level = (average_freq + average_balance - average_blockage) / 2
        
        if level >= 80:
            return 'Advanced Seeker'
        elif level >= 60:
            return 'Developing Soul'
        elif level >= 40:
            return 'Awakening Spirit'
        else:
            return 'Beginning Journey'

    def find_dominant_chakra():
        chakra_names = {
            'root': 'Root Dominant',
            'sacral': 'Sacral Dominant',
            'solarPlexus': 'Solar Dominant',
            'heart': 'Heart Dominant',
            'throat': 'Throat Dominant',
            'thirdEye': 'Third Eye Dominant',
            'crown': 'Crown Dominant'
        }

        highest_score = 0
        dominant_chakra = 'root'

        for key, center in energy_centers.items():
            score = center['frequency'] + center['balance'] - center['blockage']
            if score > highest_score:
                highest_score = score
                dominant_chakra = key

        return chakra_names[dominant_chakra]

    # Generate personality traits based on energy centers
    def generate_personality_traits():
        traits = []
        behaviors = []

        # Root chakra influence
        if energy_centers['root']['frequency'] > 60:
            traits.append('You have a strong foundation and feel secure in your physical existence.')
            behaviors.append('You approach challenges with practical wisdom and grounded thinking.')
        elif energy_centers['root']['blockage'] > 50:
            traits.append('You may struggle with feelings of insecurity or survival fears.')
            behaviors.append('You tend to worry about basic needs and material security.')

        # Sacral chakra influence  
        if energy_centers['sacral']['frequency'] > 60:
            traits.append('You express creativity freely and maintain healthy emotional boundaries.')
            behaviors.append('You embrace pleasure and intimacy with balanced enthusiasm.')
        elif energy_centers['sacral']['blockage'] > 50:
            traits.append('You may experience creative blocks or emotional numbness.')
            behaviors.append('You might avoid emotional intimacy or struggle with guilt around pleasure.')

        # Solar Plexus influence
        if energy_centers['solarPlexus']['frequency'] > 60:
            traits.append('You possess strong personal power and confident self-expression.')
            behaviors.append('You take initiative and make decisions with clarity and purpose.')
        elif energy_centers['solarPlexus']['blockage'] > 50:
            traits.append('You may struggle with low self-esteem or feelings of powerlessness.')
            behaviors.append('You tend to second-guess yourself and avoid taking leadership roles.')

        # Heart chakra influence
        if energy_centers['heart']['frequency'] > 60:
            traits.append('You radiate love and compassion, creating harmonious relationships.')
            behaviors.append('You offer support to others naturally and practice forgiveness easily.')
        elif energy_centers['heart']['blockage'] > 50:
            traits.append('You may have difficulty trusting others or expressing love freely.')
            behaviors.append('You tend to build walls to protect yourself from emotional hurt.')

        # Throat chakra influence
        if energy_centers['throat']['frequency'] > 60:
            traits.append('You communicate truth with clarity and express yourself authentically.')
            behaviors.append('You speak up for your beliefs and listen actively to others.')
        elif energy_centers['throat']['blockage'] > 50:
            traits.append('You may struggle to express your truth or fear being judged.')
            behaviors.append('You tend to remain silent when you should speak up.')

        # Third Eye influence
        if energy_centers['thirdEye']['frequency'] > 60:
            traits.append('You possess strong intuition and see beyond surface appearances.')
            behaviors.append('You trust your inner wisdom and make decisions from deep knowing.')
        elif energy_centers['thirdEye']['blockage'] > 50:
            traits.append('You may struggle with confusion or difficulty accessing intuitive insights.')
            behaviors.append('You tend to overthink and rely too heavily on logical analysis.')

        # Crown chakra influence
        if energy_centers['crown']['frequency'] > 60:
            traits.append('You feel connected to universal consciousness and divine purpose.')
            behaviors.append('You seek meaning through spiritual practice and service to others.')
        elif energy_centers['crown']['blockage'] > 50:
            traits.append('You may feel spiritually disconnected or question life\'s greater purpose.')
            behaviors.append('You tend to focus only on material concerns and dismiss spiritual matters.')

        return {
            'traits': traits[:4],  # Limit to 4 most relevant traits
            'behaviors': behaviors[:3]  # Limit to 3 most relevant behaviors
        }

    # Generate spiritual development insights
    def generate_spiritual_insights():
        overall_balance = calculate_overall_balance()
        level = calculate_overall_level()

        insights = []

        if overall_balance > 70:
            insights.append('Your energy centers show remarkable harmony, indicating advanced spiritual development.')
            insights.append('You have integrated many of your lessons and serve as a beacon for others.')
        elif overall_balance > 50:
            insights.append('You are making steady progress on your spiritual journey with growing awareness.')
            insights.append('Continue working on balancing your energy centers for deeper insights.')
        else:
            insights.append('You are at the beginning of a beautiful spiritual awakening.')
            insights.append('Focus on healing and opening your energy centers gradually and lovingly.')

        # Add level-specific insights
        if 'Advanced' in level:
            insights.append('You may be called to teach or guide others on their spiritual paths.')
        elif 'Developing' in level:
            insights.append('This is an excellent time to deepen your meditation and self-reflection practices.')
        else:
            insights.append('Begin with simple mindfulness practices and gentle energy work.')

        return {
            'level': f'You are currently at the "{level}" stage of spiritual development. This indicates your readiness for specific types of growth and service.',
            'insights': insights[:3]
        }

    # Generate healing recommendations
    def generate_healing_practices():
        practices = []
        growth_areas = []

        # Find the most blocked chakra
        most_blocked = 'root'
        highest_blockage = 0
        
        for key, center in energy_centers.items():
            if center['blockage'] > highest_blockage:
                highest_blockage = center['blockage']
                most_blocked = key

        # General practices based on overall state
        overall_balance = calculate_overall_balance()
        if overall_balance < 50:
            practices.append('Begin each day with 10 minutes of grounding meditation to stabilize your energy.')
            practices.append('Practice deep breathing exercises to clear energetic blockages.')
        else:
            practices.append('Maintain your progress with daily energy alignment practices.')
            practices.append('Consider energy healing modalities like Reiki or crystal work.')

        # Specific recommendations based on most blocked chakra
        chakra_healing = {
            'root': {
                'practice': 'Spend time in nature, practice yoga poses like child\'s pose and mountain pose.',
                'growth': 'Work on building financial security and stable relationships.'
            },
            'sacral': {
                'practice': 'Engage in creative activities, dance, and practice hip-opening yoga poses.',
                'growth': 'Explore healthy expressions of sexuality and emotional intimacy.'
            },
            'solarPlexus': {
                'practice': 'Practice power poses, affirmations, and core-strengthening exercises.',
                'growth': 'Develop leadership skills and practice setting healthy boundaries.'
            },
            'heart': {
                'practice': 'Practice loving-kindness meditation and heart-opening yoga poses.',
                'growth': 'Work on forgiveness practices and opening to deeper relationships.'
            },
            'throat': {
                'practice': 'Practice chanting, singing, or journaling to express your truth.',
                'growth': 'Work on authentic communication and creative self-expression.'
            },
            'thirdEye': {
                'practice': 'Practice meditation, visualization, and dream work to enhance intuition.',
                'growth': 'Develop psychic abilities and trust in your inner knowing.'
            },
            'crown': {
                'practice': 'Engage in prayer, meditation, and study of spiritual texts.',
                'growth': 'Explore your connection to the divine and life\'s greater purpose.'
            }
        }

        if most_blocked in chakra_healing:
            practices.append(chakra_healing[most_blocked]['practice'])
            growth_areas.append(chakra_healing[most_blocked]['growth'])

        # Add universal growth recommendations
        growth_areas.append('Continue regular spiritual practice to maintain and deepen your growth.')
        growth_areas.append('Consider working with a spiritual teacher or joining a like-minded community.')

        return {
            'practices': practices[:3],
            'growthAreas': growth_areas[:3]
        }

    # Generate the complete profile
    personality = generate_personality_traits()
    spiritual = generate_spiritual_insights()
    healing = generate_healing_practices()

    return {
        'overallLevel': calculate_overall_level(),
        'overallBalance': calculate_overall_balance(),
        'dominantChakra': find_dominant_chakra(),
        'personality': personality,
        'spiritual': spiritual,
        'healing': healing
    }