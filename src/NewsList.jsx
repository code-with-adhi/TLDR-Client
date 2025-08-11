import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/news`);
        setArticles(res.data); // axios automatically parses JSON
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    };

    fetchNews();
  }, []);

  const handleReadMore = (index) => {
    navigate(`/article/${index}`, { state: { article: articles[index] } });
  };

  return (
    <div className="news-list">
      {articles.map((article, index) => (
        <div className="card" key={article.url}>
          {article.image && <img src={article.image} alt={article.title} />}
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <button onClick={() => handleReadMore(index)}>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
