// src/App.js
import React, { useState } from 'react';
import SearchComponent from './components/SearchComponent/SearchComponent';
import './App.css';
import { fetchApi } from './services/fetchapi';
import MoviesList from './components/MoviesList/MoviesList';
import Loader from './components/Loader/Loader';
import ErrorAlert from './components/ErrorAlert/ErrorAlert';
import NoResults from './components/NoResults/NoResults';

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
      return;
    }

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

  };

  return (
    <div className="App">
      <div className={firstLoad ? 'centered' : ''}>
        <SearchComponent onSearch={handleSearch} />
      </div>
      {!searchResults.length && !isLoading && !firstLoad && <NoResults />}
      {error && <ErrorAlert error={error} handleRetry={handleRetry} />}
      {isLoading ? <Loader /> : <MoviesList movies={searchResults} />}
    </div>
  );
}

export default App;
