import axios from 'axios';

const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Session management
const getSessionId = () => {
  let sessionId = localStorage.getItem('law_of_one_session');
  if (!sessionId) {
    sessionId = generateUUID();
    localStorage.setItem('law_of_one_session', sessionId);
  }
  return sessionId;
};

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// API Functions
export const generateProfile = async (energyCenters) => {
  try {
    const sessionId = getSessionId();
    const response = await apiClient.post('/profiles', {
      sessionId,
      energyCenters
    });
    
    if (response.data.success) {
      return response.data.profile;
    } else {
      throw new Error('Failed to generate profile');
    }
  } catch (error) {
    console.error('Error generating profile:', error);
    throw error;
  }
};

export const getProfileHistory = async () => {
  try {
    const sessionId = getSessionId();
    const response = await apiClient.get(`/profiles/${sessionId}`);
    
    if (response.data.success) {
      return response.data.profiles;
    } else {
      throw new Error('Failed to fetch profile history');
    }
  } catch (error) {
    console.error('Error fetching profile history:', error);
    throw error;
  }
};

export const getProfileById = async (profileId) => {
  try {
    const response = await apiClient.get(`/profiles/profile/${profileId}`);
    
    if (response.data.success) {
      return response.data.profile;
    } else {
      throw new Error('Failed to fetch profile');
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const getSessionStats = async () => {
  try {
    const sessionId = getSessionId();
    const response = await apiClient.get(`/sessions/${sessionId}/stats`);
    
    if (response.data.success) {
      return response.data.stats;
    } else {
      throw new Error('Failed to fetch session stats');
    }
  } catch (error) {
    console.error('Error fetching session stats:', error);
    throw error;
  }
};

export { getSessionId };