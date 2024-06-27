import {useState, useEffect} from "react"
import MovieCard from "../components/MovieCard"

import './MovieGrid.css'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Home = () => {
  const [latestMovies, setLatestMovies] = useState([])

  const getLatestdMovies = async (url) =>{
    const res = await fetch(url)
    const data = await res.json()

    setLatestMovies(data.results)
    console.log(data.results)
  }

  useEffect(() => {
    const latestUrl = `${moviesURL}now_playing?${apiKey}`

    getLatestdMovies(latestUrl)

  }, []);

  return (
  <div className ="container">
    
    <h2 className=""> Ultimos Lançamentos!</h2>
    <div className="movies-container">
      {latestMovies.length > 0 && latestMovies.map(movie => <MovieCard key={movie.id} movie ={movie} />)}
    </div>

  </div>
  )
}

export default Home