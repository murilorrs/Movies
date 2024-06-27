import {useState, useEffect} from "react"
import MovieCard from "../components/MovieCard"

import './MovieGrid.css'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Home = () => {
  const [latestMovies, setLatestMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [BestRatedMovies, setBestRatedMovies] = useState([])

  const getLatestdMovies = async (url) =>{
    const res = await fetch(url)
    const data = await res.json()

    setLatestMovies(data.results)
    // console.log(data.results)
  }

   const getPopularMovies = async (url) =>{
    const res = await fetch(url)
    const data = await res.json()

    setPopularMovies(data.results)
  }
  
  const getBestRatedMovies = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    
    setBestRatedMovies(data.results)
    console.log(data.results)
  }

  useEffect(() => {
    const latestUrl = `${moviesURL}now_playing?${apiKey}`
    const popularUrl = `${moviesURL}popular?${apiKey}`
    const bestRatedUrl = `${moviesURL}top_rated?${apiKey}`

    getLatestdMovies(latestUrl)
    getPopularMovies(popularUrl)
    getBestRatedMovies(bestRatedUrl)

  }, []);

  return (
  <>

    
    <div className ="container">
      <h2 className="title">Novos lançamentos<span>!</span></h2>
      <div className="movies-container">
        {latestMovies.length === 0 && <p>Carregando...</p>}
        {latestMovies.length > 0 && 
        latestMovies.map(movie => <MovieCard key={movie.id} movie ={movie} />)}
      </div>

    <h2 className="title">Os mais populares<span>!</span></h2>
    <div className="movies-container populares">
        {popularMovies.length === 0 && <p>Carregando...</p>}
        {popularMovies.length > 0 &&
        popularMovies.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
    </div>

    <h2 className="title">Filmes aclamados pela crítica<span>!</span></h2>
    <div className="movies-container populares">
        {BestRatedMovies.length === 0 && <p>Carregando...</p>}
        {BestRatedMovies.length > 0 &&
        BestRatedMovies.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
    </div>

  </div>
  </>
  )
}

export default Home