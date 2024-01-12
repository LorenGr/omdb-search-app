// src/App.js
import React, { useState } from 'react';
import SearchComponent from './components/SearchComponent/SearchComponent';
import MovieCard from './components/MovieCard/MovieCard';
import { Spin, Result, Button, Alert } from 'antd';
import './App.css';

const API_KEY = '6c5d7d44';
const API_BASEURL = "http://www.omdbapi.com";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [lastSearchParams, setLastSearchParams] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const handleRetry = () => {
    handleSearch(lastSearchParams.title, lastSearchParams.type, lastSearchParams.year);
  }

  const handleSearch = async (title, type, year) => {
    setLastSearchParams({
      title, type, year
    });
    setFirstLoad(false);
    setIsLoading(true);
    const cacheKey = `movies-${title}-${type}-${year}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      setSearchResults(JSON.parse(cachedData));
      setIsLoading(false);
    } else {
      try {
        const response = await fetch(`${API_BASEURL}/?s=${encodeURIComponent(title)}&type=${type}&y=${year}&apikey=${API_KEY}`);
        const data = await response.json();
        if (data.Response === "True") {
          localStorage.setItem(cacheKey, JSON.stringify(data.Search));
          setSearchResults(data.Search);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        setError('Error fetching data:', error);
        setSearchResults([]);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className={firstLoad ? 'centered' : ''}>
        <SearchComponent onSearch={handleSearch} />
      </div>
      {!searchResults.length && !firstLoad && <Result
        title="No Results found!"
      />}

      {error && (
        <Alert
          className="error-alert"
          message="Error"
          description={error}
          type="error"
          action={
            <Button size="small" type="primary" onClick={handleRetry}>
              Retry
            </Button>
          }
          closable
        />
      )}
      {isLoading ? (
        <div className="spinner-container">
          <Spin size="large" />
        </div>
      ) : (
        <div className="movies-container">
          {searchResults.map((movie, key) => (
            <div key={key} className="movie-card">
              <MovieCard key={movie.imdbID} type={movie.Type} year={movie.Year} title={movie.Title} image={movie.Poster} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
