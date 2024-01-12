// src/App.js
import React, { useState } from 'react';
import SearchComponent from './components/SearchComponent/SearchComponent';
import MovieCard from './components/MovieCard/MovieCard';
import { Spin, Result, Button, Alert } from 'antd';
import './App.css';
import { fetchApi } from './services/fetchapi';

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

      const onSuccess = (data) => {
        localStorage.setItem(cacheKey, JSON.stringify(data.Search));
        setSearchResults(data.Search);
        setIsLoading(false);
      }

      const onError = (error) => {
        setError('Error fetching data:', error);
        setIsLoading(false);
        setSearchResults([]);
      }

      const onFail = () => {
        setSearchResults([]);
        setIsLoading(false);
      }

      fetchApi({
        type, year, title,
        onSuccess,
        onFail,
        onError
      });
    }
  };

  const errorAlert = <Alert
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

  const loading = <div className="spinner-container">
    <Spin size="large" />
  </div>;

  const movies = <div className="movies-container">
    {searchResults.map((movie, key) => (
      <div key={key} className="movie-card">
        <MovieCard key={movie.imdbID} type={movie.Type} year={movie.Year} title={movie.Title} image={movie.Poster} />
      </div>
    ))}
  </div>;

  const noResults = <Result
    title="No Results found!"
  />;

  return (
    <div className="App">
      <div className={firstLoad ? 'centered' : ''}>
        <SearchComponent onSearch={handleSearch} />
      </div>
      {!searchResults.length && !isLoading && !firstLoad && noResults}
      {error && errorAlert}
      {isLoading ? loading : movies}
    </div>
  );
}

export default App;
