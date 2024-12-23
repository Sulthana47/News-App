import React from "react";
import './style.css';

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <img src={article.urlToImage} alt={article.title} />
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

export default ArticleCard;
