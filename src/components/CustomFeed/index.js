import React, { useState } from "react";
import "./style.css";

const Preferences = ({ preferences, onSavePreferences }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalPreferences((prev) => ({
      ...prev,
      [name]: name === "categories" ? value.split(",") : value,
    }));
  };

  const handleSave = () => {
    onSavePreferences(localPreferences);
  };

  return (
    <div className="preferences-container">
      <h3>Customize Your Feed</h3>
      <label>
        Preferred Sources:
        <input
          type="text"
          name="sources"
          value={localPreferences.sources}
          onChange={handleChange}
          placeholder="e.g., bbc-news, cnn"
        />
      </label>
      <label>
        Preferred Categories (comma-separated):
        <input
          type="text"
          name="categories"
          value={localPreferences.categories.join(",")}
          onChange={handleChange}
          placeholder="e.g., technology, business"
        />
      </label>
      <label>
        Preferred Authors:
        <input
          type="text"
          name="authors"
          value={localPreferences.authors}
          onChange={handleChange}
          placeholder="e.g., John Doe"
        />
      </label>
      <button onClick={handleSave}>Save Preferences</button>
    </div>
  );
};

export default Preferences;
