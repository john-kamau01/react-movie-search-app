import React, { useState, useEffect } from 'react';

import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';

const API_URL ='http://www.omdbapi.com/?apikey=506f2664';

const movie1 = {
    "Title": "Italian Spiderman",
    "Year": "2007",
    "imdbID": "tt2705436",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg"
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);

    // we are using title as an argument because we are expecting the search to use movie titles
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`); //This will call our API
        const data = await response.json(); //Store the data in the data variable

        setMovies(data.Search);
        //console.log(data.Search);
    }

    useEffect(()=>{
        searchMovies('Spiderman');
    }, []);

    return (
        <div className='app'>
            <h1>Movie Store</h1>
            <div className='search'>
                <input 
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon} 
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />   
            </div>

            {movies?.length > 0 ? (
                <div className='container'>
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                <div className='empty'>
                    <h2>No movies found</h2>
                </div>
            )}
            
        </div>
    )
}

export default App;