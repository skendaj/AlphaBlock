import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          query: JSON.stringify({
            $query: {
              $and: [
                {
                  conceptUri: 'http://en.wikipedia.org/wiki/Cryptocurrency',
                },
                {
                  lang: 'eng',
                },
              ],
            },
            $filter: {
              forceMaxDataTimeWindow: '31',
            },
          }),
          resultType: 'articles',
          articlesSortBy: 'date',
          apiKey: '2f2d536b-da6d-4b3f-9758-856516e66bbe',
        };
    
        const response = await axios({
          method: 'post',
          url: 'https://newsapi.ai/api/v1/article/getArticles',
          data: params,
        });
    
        // Extract the articles data from the response
        const articles = response.data.articles?.results || [];
        setNews(articles);
        setLoading(false);
      } catch (error) {
        // Handle error here
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Set interval to change the current index every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 5000);

    // Clear the interval when the component is unmounted or when news is empty
    return () => clearInterval(interval);
  }, [news]);

  return (
    <div className="crypto-news-container">
      <h3 className="crypto-news-title">📰 Latest Crypto News</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="carousel">
          {news.length > 0 && (
            <div className="carousel-item">
              <h2>{news[currentIndex]?.title}</h2>
              <p> 
                <a href={news[currentIndex]?.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}
> 
                click here to read more
                </a>
                <h4>{news[currentIndex]?.authors.name}</h4>
                {news[currentIndex]?.creator && news[currentIndex]?.creator[0]}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsComponent;
