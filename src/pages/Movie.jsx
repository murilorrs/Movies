import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsGraphUp, BsHourglassSplit, BsFillFileEarmarkTextFill, BsWallet } from 'react-icons/bs';

import './Movie.css';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const baseImageUrl = 'https://image.tmdb.org/t/p/original';

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  const getMovie = async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      setMovie(data);
  };

  const getMovieCredits = async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      setCast(data.cast);
  };

  const formataMoeda = (number) => {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}`;
    getMovie(movieUrl);

    const creditsUrl = `${moviesURL}${id}/credits?${apiKey}`;
    getMovieCredits(creditsUrl);
  }, [id]);

  return (
    <div
      className='movie_background'
      style={{
        backgroundImage: `url(${baseImageUrl}${movie && movie.backdrop_path})`,
      }}
    >
      <div className='overlay'></div>

      {movie && (
        <div className='movie_details'>
          <div className='movie_info'>
            <div className='titulo'>
              <h1>{movie.title}</h1>
              <p className='tagline'>{movie.tagline}</p>
            </div>

            <div className='info'>
              <h3>
                <BsWallet /> Orçamento:
              </h3>
              <p>{formataMoeda(movie.budget)}</p>
            </div>

            <div className='info'>
              <h3>
                <BsGraphUp /> Receita:
              </h3>
              <p>{formataMoeda(movie.revenue)}</p>
            </div>

            <div className='info'>
              <h3>
                <BsHourglassSplit /> Duração:
              </h3>
              <p>{movie.runtime} minutos</p>
            </div>

            <div className='info description'>
              <h3>
                <BsFillFileEarmarkTextFill /> Descrição:
              </h3>
              <p>{movie.overview}</p>
            </div>

            <div className='cast'>
              <h3>Elenco:</h3>
              <ul>
                {cast.slice(0,9).map((actor) => (
                  <li key={actor.id}>{actor.name} - {actor.character}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
