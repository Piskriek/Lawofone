# Law of One Profile Generator - API Contracts

## Overview
This document outlines the API contracts and data flow between frontend and backend for the Law of One Profile Generator application.

## Mock Data Currently Used
The frontend currently uses `mock.js` which generates:
- Real-time spiritual profiles based on 7 energy center values
- Personality traits, behavioral tendencies
- Spiritual development insights
- Healing recommendations and growth areas

## Backend Implementation Plan

### Data Models

#### EnergyProfile
```javascript
{
  _id: ObjectId,
  userId: String (optional for anonymous sessions),
  sessionId: String (for tracking anonymous sessions),
  energyCenters: {
    root: { frequency: Number, balance: Number, blockage: Number },
    sacral: { frequency: Number, balance: Number, blockage: Number },
    solarPlexus: { frequency: Number, balance: Number, blockage: Number },
    heart: { frequency: Number, balance: Number, blockage: Number },
    throat: { frequency: Number, balance: Number, blockage: Number },
    thirdEye: { frequency: Number, balance: Number, blockage: Number },
    crown: { frequency: Number, balance: Number, blockage: Number }
  },
  generatedProfile: {
    overallLevel: String,
    overallBalance: Number,
    dominantChakra: String,
    personality: {
      traits: [String],
      behaviors: [String]
    },
    spiritual: {
      level: String,
      insights: [String]
    },
    healing: {
      practices: [String],
      growthAreas: [String]
    }
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### Session (for tracking anonymous users)
```javascript
{
  _id: ObjectId,
  sessionId: String,
  profileCount: Number,
  createdAt: Date,
  lastAccessedAt: Date
}
```

### API Endpoints

#### 1. Generate/Update Profile
- **POST** `/api/profiles`
- **Body**: 
  ```javascript
  {
    sessionId?: String,
    energyCenters: {
      root: { frequency, balance, blockage },
      sacral: { frequency, balance, blockage },
      // ... all 7 chakras
    }
  }
  ```
- **Response**: Complete profile object with generated insights
- **Purpose**: Save energy center values and return generated spiritual profile

#### 2. Get Profile History
- **GET** `/api/profiles/:sessionId`
- **Response**: Array of saved profiles for session
- **Purpose**: Allow users to see their profile history

#### 3. Get Profile by ID
- **GET** `/api/profiles/profile/:profileId`
- **Response**: Single profile object
- **Purpose**: Retrieve specific saved profile

### Frontend Integration Changes

#### Remove Mock Data
1. Replace `import { generateProfile } from '../data/mock'` with API calls
2. Update `useEffect` in ProfileGenerator to call backend API
3. Add loading states during API calls
4. Handle error states for API failures

#### Add API Service
Create `src/services/api.js`:
```javascript
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const saveProfile = async (sessionId, energyCenters) => {
  // POST request to generate and save profile
};

export const getProfileHistory = async (sessionId) => {
  // GET request for profile history
};
```

#### Session Management
1. Generate unique sessionId on first visit (localStorage)
2. Include sessionId in all API calls
3. Allow users to view their profile history

### Database Collections
- `energy_profiles` - Store all generated profiles
- `sessions` - Track anonymous user sessions

### Key Features to Implement
1. **Real-time Profile Generation**: Replace mock data with backend logic
2. **Session-based Storage**: Save profiles for anonymous users
3. **Profile History**: Allow users to see previous profiles
4. **Export Feature**: Generate shareable profile reports
5. **Analytics**: Track popular chakra combinations (optional)

### Error Handling
- Invalid energy center values (0-100 range validation)
- Database connection failures
- Missing required fields
- Session not found scenarios

This contract ensures seamless backend integration while maintaining all current frontend functionality.