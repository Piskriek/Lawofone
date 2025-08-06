import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Calendar, Eye, Loader2, RefreshCw } from 'lucide-react';
import { getProfileHistory, getSessionStats } from '../services/api';
import { useToast } from '../hooks/use-toast';

const ProfileHistory = ({ onBack, onLoadProfile }) => {
  const [profiles, setProfiles] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [profilesData, statsData] = await Promise.all([
        getProfileHistory(),
        getSessionStats()
      ]);
      
      setProfiles(profilesData);
      setStats(statsData);
    } catch (err) {
      setError('Failed to load profile history');
      console.error('Error fetching data:', err);
      
      toast({
        title: "Error",
        description: "Failed to load your profile history.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDominantColor = (dominantChakra) => {
    const colorMap = {
      'Root Dominant': 'bg-red-100 text-red-800 border-red-200',
      'Sacral Dominant': 'bg-orange-100 text-orange-800 border-orange-200',
      'Solar Dominant': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Heart Dominant': 'bg-green-100 text-green-800 border-green-200',
      'Throat Dominant': 'bg-blue-100 text-blue-800 border-blue-200',
      'Third Eye Dominant': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Crown Dominant': 'bg-violet-100 text-violet-800 border-violet-200'
    };
    return colorMap[dominantChakra] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <Loader2 className="w-12 h-12 mx-auto text-indigo-400 mb-4 animate-spin" />
              <p className="text-gray-600">Loading your spiritual journey...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Generator
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Spiritual Journey</h1>
            <p className="text-gray-600">Track your energy center evolution over time</p>
          </div>
        </div>

        {/* Stats Card */}
        {stats && (
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Journey Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{stats.profileCount}</div>
                  <div className="text-sm text-gray-600">Profiles Created</div>
                </div>
                {stats.firstVisit && (
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-800">Journey Started</div>
                    <div className="text-sm text-gray-600">{formatDate(stats.firstVisit)}</div>
                  </div>
                )}
                {stats.lastVisit && (
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-800">Last Visit</div>
                    <div className="text-sm text-gray-600">{formatDate(stats.lastVisit)}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
              <span>{error}</span>
              <Button variant="ghost" size="sm" onClick={fetchData}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Profiles List */}
        {profiles.length === 0 ? (
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No saved profiles yet. Start creating your first spiritual profile!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {profiles.map((profile, index) => (
              <Card key={profile._id} className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={getDominantColor(profile.generatedProfile.dominantChakra)}>
                          {profile.generatedProfile.dominantChakra}
                        </Badge>
                        <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                          {profile.generatedProfile.overallLevel}
                        </Badge>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          {profile.generatedProfile.overallBalance}% Balance
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        {formatDate(profile.createdAt)}
                      </div>
                      
                      <p className="text-gray-700 text-sm">
                        {profile.generatedProfile.spiritual.level}
                      </p>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onLoadProfile(profile)}
                      className="flex items-center gap-2 ml-4"
                    >
                      <Eye className="w-4 h-4" />
                      View Profile
                    </Button>
                  </div>
                  
                  {/* Energy Centers Preview */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-600 mb-2">Energy Centers Health:</div>
                    <div className="flex gap-2 flex-wrap">
                      {Object.entries(profile.energyCenters).map(([chakra, values]) => {
                        const health = Math.max(0, Math.round((values.frequency + values.balance - values.blockage) / 3));
                        const chakraNames = {
                          root: 'Root',
                          sacral: 'Sacral',
                          solarPlexus: 'Solar',
                          heart: 'Heart',
                          throat: 'Throat',
                          thirdEye: 'Third Eye',
                          crown: 'Crown'
                        };
                        
                        return (
                          <div key={chakra} className="text-xs">
                            <span className="text-gray-600">{chakraNames[chakra]}: </span>
                            <span className={health >= 70 ? 'text-green-600' : health >= 50 ? 'text-yellow-600' : 'text-red-600'}>
                              {health}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHistory;