import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          query: JSON.stringify({
            $query: {
              $and: [
                {
                  $and: [
                    { conceptUri: 'http://en.wikipedia.org/wiki/Cryptocurrency' },
                    { conceptUri: 'http://en.wikipedia.org/wiki/Cryptocurrency_exchange' },
                    { conceptUri: 'http://en.wikipedia.org/wiki/Bitcoin' }
                  ]
                },
                {
                  $or: [
                    { locationUri: 'http://en.wikipedia.org/wiki/United_States' },
                    { locationUri: 'http://en.wikipedia.org/wiki/United_Kingdom' },
                    { locationUri: 'http://en.wikipedia.org/wiki/Europe' },
                    { locationUri: 'http://en.wikipedia.org/wiki/Australia' },
                    { locationUri: 'http://en.wikipedia.org/wiki/China' },
                    { locationUri: 'http://en.wikipedia.org/wiki/Russia' },
                    { locationUri: 'http://en.wikipedia.org/wiki/Africa' }
                  ]
                },
                { lang: 'eng' }
              ]
            },
            $filter: { forceMaxDataTimeWindow: '31' }
          }),
          resultType: 'articles',
          articlesSortBy: 'date',
          apiKey: '2f2d536b-da6d-4b3f-9758-856516e66bbe'
        };

        const response = await axios.get(
          'https://newsapi.ai/api/v1/article/getArticles',
          { params }
        );

        setNews(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="crypto-news-container">
      <h3 className="crypto-news-title">📰 Latest Crypto News</h3>
      <div className="carousel">
        {news.length > 0 && (
          <div className="carousel-item">
            <h2>{news[currentIndex]?.title}</h2>
            <p>
              <a
                href={news[currentIndex]?.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
              {' by '}
              {news[currentIndex]?.creator && news[currentIndex]?.creator[0]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsComponent;
