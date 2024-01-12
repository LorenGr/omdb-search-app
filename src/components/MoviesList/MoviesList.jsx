import MovieCard from '../MovieCard/MovieCard';

const MoviesList = ({ movies }) => {
    if (!movies) return <></>;
    return <div className="movies-container">
        {movies.map((movie, key) => (
            <div key={key} className="movie-card">
                <MovieCard key={movie.imdbID} type={movie.Type} year={movie.Year} title={movie.Title} image={movie.Poster} />
            </div>
        ))}
    </div>;
}
export default MoviesList;