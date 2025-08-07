import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileGenerator from "./components/ProfileGenerator";
import { Toaster } from "./components/ui/toaster";
import BlockageQuestionnaire from "./components/BlockageQuestionnaire";
import RecommendationsModal from "./components/RecommendationsModal";

function App() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [recommendations, setRecommendations] = useState({});
  const [showRecommendationsModal, setShowRecommendationsModal] = useState(false);

  useEffect(() => {
    // Load recommendations from local storage on component mount
    const savedRecommendations = localStorage.getItem('chakraRecommendations');
    if (savedRecommendations) {
      setRecommendations(JSON.parse(savedRecommendations));
      setShowRecommendationsModal(true);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleQuestionnaireComplete = (generatedRecommendations) => {