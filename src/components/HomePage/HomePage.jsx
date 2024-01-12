import React, { useState } from 'react';
import { fetchApi } from '../../services/fetchapi';
import MoviesList from '../MoviesList/MoviesList';
import Loader from '../Loader/Loader';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import NoResults from '../NoResults/NoResults';
import SearchComponent from '../SearchComponent/SearchComponent';

const HomePage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [lastSearchParams, setLastSearchParams] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const handleRetry = () => {
        handleSearch(lastSearchParams.title, lastSearchParams.type, lastSearchParams.year);
    }
    const getCacheKey = (title, type, year) => `movies-${title}-${type}-${year}`;

    const fetchFromApi = (title, type, year) => {
        const onSuccess = (data) => {
            localStorage.setItem(
                getCacheKey(title, type, year),
                JSON.stringify(data.Search));
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

    const handleSearch = async (title, type, year) => {
        setLastSearchParams({ title, type, year });
        setFirstLoad(false);
        setIsLoading(true);
        const cachedData = localStorage.getItem(
            getCacheKey(title, type, year)
        );
        if (cachedData) {
            setSearchResults(JSON.parse(cachedData));
            setIsLoading(false);
        } else {
            fetchFromApi(title, type, year);
        }
    }

    return <>
        <div className={firstLoad ? 'centered' : ''}>
            <SearchComponent onSearch={handleSearch} />
        </div>
        {!searchResults.length && !isLoading && !firstLoad && <NoResults />}
        {error && <ErrorAlert error={error} handleRetry={handleRetry} />}
        {isLoading ? <Loader /> : <MoviesList movies={searchResults} />}
    </>;

}
export default HomePage;