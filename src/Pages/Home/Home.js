import React, { useState, useEffect } from "react";
import { fetchArticles } from "../../API/newsapi";
import { fetchArticlesCategories } from "../../API/guardian";
import Header from "../../components/Header";
import Filters from "../../components/Filters";
import ArticleCard from "../../components/ArticleCard";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({ date: "", source: "", category: "" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchArticlesData = async () => {
      let fetchedArticles = [];

      if (filters.category) {
        const categoryArticles = await fetchArticlesCategories(filters.category);
        fetchedArticles = categoryArticles;
      } else {
        const data = await fetchArticles(searchQuery, filters);
        fetchedArticles = data;
      }

      setArticles(fetchedArticles);
    };

    fetchArticlesData();
  }, [filters, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredArticles = articles.filter((article) => {
    const matchesDate =
    !filters.date || (article.publishedAt && article.publishedAt.startsWith(filters.date));
    const matchesSource =
      !filters.source || article.source?.id === filters.source; 
    const matchesCategory =
      !filters.category || article.sectionName === filters.category;

  
    return (
      article.title &&
      article.description &&
      article.urlToImage &&
      article.url &&
      matchesDate &&
      matchesSource &&
      matchesCategory
    );
  });
  

  return (
    <div>
      <Header onSearch={handleSearch} />
      <Filters onFilterChange={handleFilterChange} />
      <div className="articles-container">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
