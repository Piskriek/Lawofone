#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for Law of One Profile Generator
Tests all API endpoints with various scenarios including validation and error handling
"""

import requests
import json
import os
from datetime import datetime
import time

# Get backend URL from environment
BACKEND_URL = "https://47d12535-ed31-4d3b-bb7f-2fb4f7c73248.preview.emergentagent.com/api"

# Test data
VALID_ENERGY_CENTERS = {
    "root": {"frequency": 60, "balance": 70, "blockage": 30},
    "sacral": {"frequency": 55, "balance": 65, "blockage": 25}, 
    "solarPlexus": {"frequency": 75, "balance": 80, "blockage": 20},
    "heart": {"frequency": 85, "balance": 90, "blockage": 15},
    "throat": {"frequency": 70, "balance": 75, "blockage": 25},
    "thirdEye": {"frequency": 80, "balance": 85, "blockage": 10},
    "crown": {"frequency": 90, "balance": 95, "blockage": 5}
}

INVALID_ENERGY_CENTERS = {
    "root": {"frequency": -10, "balance": 150, "blockage": 30},  # Invalid values
    "sacral": {"frequency": 55, "balance": 65, "blockage": 25}, 
    "solarPlexus": {"frequency": 75, "balance": 80, "blockage": 20},
    "heart": {"frequency": 85, "balance": 90, "blockage": 15},
    "throat": {"frequency": 70, "balance": 75, "blockage": 25},
    "thirdEye": {"frequency": 80, "balance": 85, "blockage": 10},
    "crown": {"frequency": 90, "balance": 95, "blockage": 5}
}

class BackendTester:
    def __init__(self):
        self.session_id = f"test-session-{int(time.time())}"
        self.profile_id = None
        self.test_results = []
        
    def log_test(self, test_name, success, details=""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details
        })
        
    def test_health_check(self):
        """Test GET /api/ endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/")
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "Law of One" in data["message"]:
                    self.log_test("Health Check", True, f"API is running: {data['message']}")
                    return True
                else:
                    self.log_test("Health Check", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Health Check", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Health Check", False, f"Connection error: {str(e)}")
            return False
            
    def test_profile_generation(self):
        """Test POST /api/profiles with valid data"""
        try:
            payload = {
                "sessionId": self.session_id,
                "energyCenters": VALID_ENERGY_CENTERS
            }
            
            response = requests.post(f"{BACKEND_URL}/profiles", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "profileId" in data and "profile" in data:
                    self.profile_id = data["profileId"]
                    profile = data["profile"]
                    
                    # Validate profile structure
                    required_fields = ["overallLevel", "overallBalance", "dominantChakra", "personality", "spiritual", "healing"]
                    missing_fields = [field for field in required_fields if field not in profile]
                    
                    if not missing_fields:
                        self.log_test("Profile Generation", True, f"Profile created with ID: {self.profile_id}")
                        return True
                    else:
                        self.log_test("Profile Generation", False, f"Missing fields: {missing_fields}")
                        return False
                else:
                    self.log_test("Profile Generation", False, f"Invalid response structure: {data}")
                    return False
            else:
                self.log_test("Profile Generation", False, f"Status code: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Profile Generation", False, f"Error: {str(e)}")
            return False
            
    def test_profile_generation_without_session(self):
        """Test POST /api/profiles without sessionId (should auto-generate)"""
        try:
            payload = {
                "energyCenters": VALID_ENERGY_CENTERS
            }
            
            response = requests.post(f"{BACKEND_URL}/profiles", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "sessionId" in data and "profileId" in data:
                    self.log_test("Profile Generation (Auto Session)", True, f"Auto-generated session: {data['sessionId']}")
                    return True
                else:
                    self.log_test("Profile Generation (Auto Session)", False, f"Invalid response: {data}")
                    return False
            else:
                self.log_test("Profile Generation (Auto Session)", False, f"Status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Profile Generation (Auto Session)", False, f"Error: {str(e)}")
            return False
            
    def test_invalid_data_validation(self):
        """Test POST /api/profiles with invalid data"""
        try:
            payload = {
                "sessionId": self.session_id,
                "energyCenters": INVALID_ENERGY_CENTERS
            }
            
            response = requests.post(f"{BACKEND_URL}/profiles", json=payload)
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test("Data Validation", True, "Properly rejected invalid data")
                return True
            else:
                self.log_test("Data Validation", False, f"Expected 422, got {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Data Validation", False, f"Error: {str(e)}")
            return False
            
    def test_profile_history(self):
        """Test GET /api/profiles/{sessionId}"""
        try:
            response = requests.get(f"{BACKEND_URL}/profiles/{self.session_id}")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "profiles" in data:
                    profiles = data["profiles"]
                    if len(profiles) > 0:
                        self.log_test("Profile History", True, f"Retrieved {len(profiles)} profiles")
                        return True
                    else:
                        self.log_test("Profile History", False, "No profiles found in history")
                        return False
                else:
                    self.log_test("Profile History", False, f"Invalid response: {data}")
                    return False
            else:
                self.log_test("Profile History", False, f"Status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Profile History", False, f"Error: {str(e)}")
            return False
            
    def test_profile_retrieval(self):
        """Test GET /api/profiles/profile/{profileId}"""
        if not self.profile_id:
            self.log_test("Profile Retrieval", False, "No profile ID available for testing")
            return False
            
        try:
            response = requests.get(f"{BACKEND_URL}/profiles/profile/{self.profile_id}")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "profile" in data:
                    profile = data["profile"]
                    if profile.get("_id") == self.profile_id:
                        self.log_test("Profile Retrieval", True, f"Retrieved profile: {self.profile_id}")
                        return True
                    else:
                        self.log_test("Profile Retrieval", False, "Profile ID mismatch")
                        return False
                else:
                    self.log_test("Profile Retrieval", False, f"Invalid response: {data}")
                    return False
            else:
                self.log_test("Profile Retrieval", False, f"Status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Profile Retrieval", False, f"Error: {str(e)}")
            return False
            
    def test_nonexistent_profile(self):
        """Test GET /api/profiles/profile/{invalid_id}"""
        try:
            fake_id = "507f1f77bcf86cd799439011"  # Valid ObjectId format but non-existent
            response = requests.get(f"{BACKEND_URL}/profiles/profile/{fake_id}")
            
            if response.status_code == 404:
                self.log_test("Nonexistent Profile", True, "Properly returned 404 for non-existent profile")
                return True
            else:
                self.log_test("Nonexistent Profile", False, f"Expected 404, got {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Nonexistent Profile", False, f"Error: {str(e)}")
            return False
            
    def test_session_stats(self):
        """Test GET /api/sessions/{sessionId}/stats"""
        try:
            response = requests.get(f"{BACKEND_URL}/sessions/{self.session_id}/stats")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "stats" in data:
                    stats = data["stats"]
                    if "profileCount" in stats and stats["profileCount"] > 0:
                        self.log_test("Session Stats", True, f"Profile count: {stats['profileCount']}")
                        return True
                    else:
                        self.log_test("Session Stats", False, f"Invalid stats: {stats}")
                        return False
                else:
                    self.log_test("Session Stats", False, f"Invalid response: {data}")
                    return False
            else:
                self.log_test("Session Stats", False, f"Status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Session Stats", False, f"Error: {str(e)}")
            return False
            
    def test_nonexistent_session_stats(self):
        """Test GET /api/sessions/{invalid_session}/stats"""
        try:
            fake_session = "nonexistent-session-123"
            response = requests.get(f"{BACKEND_URL}/sessions/{fake_session}/stats")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("stats", {}).get("profileCount") == 0:
                    self.log_test("Nonexistent Session Stats", True, "Properly returned empty stats for non-existent session")
                    return True
                else:
                    self.log_test("Nonexistent Session Stats", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Nonexistent Session Stats", False, f"Status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Nonexistent Session Stats", False, f"Error: {str(e)}")
            return False
            
    def test_profile_content_validation(self):
        """Test that generated profiles contain expected spiritual content"""
        try:
            payload = {
                "sessionId": f"content-test-{int(time.time())}",
                "energyCenters": VALID_ENERGY_CENTERS
            }
            
            response = requests.post(f"{BACKEND_URL}/profiles", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                profile = data.get("profile", {})
                
                # Check spiritual content quality
                checks = []
                
                # Check overall level is meaningful
                level = profile.get("overallLevel", "")
                valid_levels = ["Advanced Seeker", "Developing Soul", "Awakening Spirit", "Beginning Journey"]
                checks.append(("Valid spiritual level", level in valid_levels))
                
                # Check balance is numeric and reasonable
                balance = profile.get("overallBalance", 0)
                checks.append(("Valid balance range", 0 <= balance <= 100))
                
                # Check dominant chakra is meaningful
                chakra = profile.get("dominantChakra", "")
                checks.append(("Valid dominant chakra", "Dominant" in chakra))
                
                # Check personality traits exist
                personality = profile.get("personality", {})
                traits = personality.get("traits", [])
                behaviors = personality.get("behaviors", [])
                checks.append(("Has personality traits", len(traits) > 0))
                checks.append(("Has behaviors", len(behaviors) > 0))
                
                # Check spiritual insights exist
                spiritual = profile.get("spiritual", {})
                insights = spiritual.get("insights", [])
                checks.append(("Has spiritual insights", len(insights) > 0))
                
                # Check healing practices exist
                healing = profile.get("healing", {})
                practices = healing.get("practices", [])
                growth_areas = healing.get("growthAreas", [])
                checks.append(("Has healing practices", len(practices) > 0))
                checks.append(("Has growth areas", len(growth_areas) > 0))
                
                failed_checks = [check[0] for check in checks if not check[1]]
                
                if not failed_checks:
                    self.log_test("Profile Content Validation", True, "All content validation checks passed")
                    return True
                else:
                    self.log_test("Profile Content Validation", False, f"Failed checks: {failed_checks}")
                    return False
            else:
                self.log_test("Profile Content Validation", False, f"Status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Profile Content Validation", False, f"Error: {str(e)}")
            return False
            
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"\n🧪 Starting Law of One Profile Generator Backend Tests")
        print(f"Backend URL: {BACKEND_URL}")
        print(f"Test Session ID: {self.session_id}")
        print("=" * 60)
        
        # Run tests in logical order
        tests = [
            self.test_health_check,
            self.test_profile_generation,
            self.test_profile_generation_without_session,
            self.test_invalid_data_validation,
            self.test_profile_history,
            self.test_profile_retrieval,
            self.test_nonexistent_profile,
            self.test_session_stats,
            self.test_nonexistent_session_stats,
            self.test_profile_content_validation
        ]
        
        for test in tests:
            test()
            time.sleep(0.5)  # Small delay between tests
            
        # Summary
        print("\n" + "=" * 60)
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        print(f"📊 Test Summary: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 All tests passed! Backend API is working correctly.")
            return True
        else:
            print("⚠️  Some tests failed. Check the details above.")
            failed_tests = [result["test"] for result in self.test_results if not result["success"]]
            print(f"Failed tests: {failed_tests}")
            return False

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    exit(0 if success else 1)