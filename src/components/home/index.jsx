import React, { useState } from 'react';
import { useAuth } from '../../auth_context'
import Card from '../books/Card';
import bookshelfImage1 from '../../images/bookshelf1.png';
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const GOOGLE_BOOKS_API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;


const Home = () => {
    const { currentUser } = useAuth()
    const [movieData, setMovieData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const getMovie = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchValue)}`
            );

            if (!response.ok) {
                throw new Error('Movie not found');
            }

            const data = await response.json();
            if (data.results.length === 0) {
                throw new Error('Movie not found');
            }

            setMovieData(data.results);

            const bookResponse = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(data.results[0].title)}&key=AIzaSyCQPpN03mHlWFxXHd-um4Afuk6BxMzML7Y`
            );

            if (!bookResponse.ok) {
                throw new Error('Books not found');
            }

            const bookData = await bookResponse.json();
            // Cambiamos aquí para obtener los libros de bookData.items
            setBookData(bookData.items || []);  // Guardar los resultados de libros

        } catch (err) {
            setMovieData([]);
            setBookData([]);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <div className='column-container'>
                <div className='search-bar'>
                    <h1 className='h1'>Discover a book based on your favorite film!</h1>
                    <form className='home-form' onSubmit={getMovie}>
                        <label htmlFor="search-input"></label>
                        <input className='home-input'
                            type="text"
                            id="search-input"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            required
                        />
                        <button className='button' type="submit">Search</button>
                    </form>
                    <img className='home-img' src={bookshelfImage1} alt="bookshelf" />
                </div>
                {loading && <p>Loading...</p>} {/* Indicador de carga */}
                {error && <p className="error">{error}</p>} {/* Mostrar error si existe */}

                {/* Comprobar si hay datos en movieData y si el primer elemento está definido */}
                {movieData.length > 0 && movieData[0] && (
                    <div className="column movie-details">
                        <h2>{movieData[0].title}</h2>
                        <p>
                            <strong>Release Date:</strong> {movieData[0].release_date}
                        </p>
                        <div className='overview'>
                            <p>{movieData[0].overview}</p>
                        </div>
                        {movieData[0].poster_path ? (
                            <div className='image-container'>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movieData[0].poster_path}`}
                                    alt={movieData[0].title}
                                />
                            </div>
                        ) : (
                            <p>No poster available</p>
                        )}
                    </div>
                )}
            </div>
            <div className='card-container'>
                {/* Mostrar libros relacionados */}
                {bookData.length > 0 && (
                    <div className='column-container'>
                        <Card book={bookData} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home