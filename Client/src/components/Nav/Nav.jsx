import SearchBar from "../SearchBar/SearchBar"
import { Link, NavLink } from "react-router-dom";

export default function Nav ({onSearch, onSearchRandom, logOut}){

    let randomCharacter = Math.floor(Math.random()*(852-1+1)+1)
  
    return(
        <nav>
            <SearchBar onSearch={onSearch}/>
            <Link to ="/about">
                <button>About</button>
            </Link>
            <Link to = "/home">
                <button>Home</button>
            </Link>
            <NavLink to = "/favorites">
                <button>Favorites</button>
            </NavLink>
            <button onClick={()=>onSearchRandom(randomCharacter)}>Character Random</button>
            <button onClick={()=>{logOut()}}>Log Out</button>

        </nav>
    )
}