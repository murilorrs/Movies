import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsGraphUp, BsHourglassSplit, BsFillFileEarmarkTextFill, BsWallet } from 'react-icons/bs';


import './Movie.css'

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const baseImageUrl = 'https://image.tmdb.org/t/p/original'; // URL base para as imagens (original é o tamanho original da imagem)

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
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
  }, []);

  return (
    <div
      className='movie_background'
      style={{
        backgroundImage: `url(${baseImageUrl}${movie && movie.backdrop_path})`,
      }}>

      <div className='overlay'></div>

      {movie && (
        <div className='movie_details'>
          <div className='movie_info'>
            <h1>{movie.title}</h1>
            <p className='tagline'>{movie.tagline}</p>

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
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
