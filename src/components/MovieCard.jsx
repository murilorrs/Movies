import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  return (
    <div className="movie-card">
      <img src={imageUrl + movie.poster_path} alt={movie.title} />

      {/* <h2>{movie.title}</h2> */}
      <div className='infos'>
      <p>
        <FaStar /> {movie.vote_average}
      </p>

      <button className='button_detalhes'>
        {<Link to={`/movie/${movie.id}`}>Mais detalhes</Link>}
      </button>

      </div>
    </div>
  );
};

export default MovieCard;
