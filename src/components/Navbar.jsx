import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import {BiSearchAlt2}  from "react-icons/bi"

import './Navbar.css'

const Navbar = () =>{
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault()
    
    if(!search) return 

    navigate(`/search?q=${search}`)
    setSearch("")
  }

  return (
      <nav id='navbar'>
        <h1>
          <Link to="/"> MOVIES</Link>
        </h1>
        <form onSubmit={handleSubmit}>
          <input className="input" type="text" placeholder="Busque por um filme" 
          onChange={e => setSearch(e.target.value)}
          value={search}/>
          <button type="submit">
            <BiSearchAlt2/>
          </button>
        </form>
      </nav>
  )
}

export default Navbar