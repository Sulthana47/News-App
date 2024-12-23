import React, { useState, useEffect } from "react";
import { fetchArticles } from "../../API/newsapi";
import { fetchArticlesCategories } from "../../API/guardian";
import './style.css';

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    date: "",
    source: "",
    category:"",
  });
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchSourceData = async () => {
      const articles = await fetchArticles();
      const availableSources = [];
  
      articles.forEach((article) => {
        if (article.source?.id && article.source?.name) {
          availableSources.push({ id: article.source.id, name: article.source.name });
        }
      });
  
      setSources(availableSources);
    };
  
    fetchSourceData();
  }, []);
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await fetchArticlesCategories();  
        const availableCategories = [];

        fetchedCategories.forEach((category) => {
          if (category.sectionId && !availableCategories.includes(category.sectionName)) {
            availableCategories.push(category.sectionName);  
          }
        });

        setCategories(availableCategories);  
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    onFilterChange(name, value);
  };

  return (
    <div className="filters-container">
      <div>
        <label>Date: </label>
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        />
      </div>

      <div>
        <label>Source: </label>
        <select
          name="source"
          value={filters.source}
          onChange={handleFilterChange}
        >
          <option value="">Select a source</option>
          {sources.length === 0 ? (
            <option value="">No sources available</option>
          ) : (
            sources.map((source, index) => (
              <option key={index} value={source.id}>
                {source.name}
              </option>
            ))
          )}
        </select>
      </div>

      <div>
        <label>Category: </label>
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value="">Select a category</option>
          {categories.length === 0 ? (
            <option value="">No Categories available</option>
          ) : (
            categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
};

export default Filters;
