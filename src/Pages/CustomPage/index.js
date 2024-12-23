import React, { useState, useEffect } from "react";
import Preferences from "../../components/CustomFeed";

const CustomPage = () => {
  const [preferences, setPreferences] = useState({
    sources: "",
    categories: [],
    authors: "",
  });

  useEffect(() => {
    const savedPreferences = JSON.parse(localStorage.getItem("preferences"));
    if (savedPreferences) {
      setPreferences(savedPreferences);
    }
  }, []);

  const handleSavePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem("preferences", JSON.stringify(newPreferences));
  };

  return (
    <div>
      <h1>Customize Your News Feed</h1>
      <Preferences preferences={preferences} onSavePreferences={handleSavePreferences} />
    </div>
  );
};

export default CustomPage;
