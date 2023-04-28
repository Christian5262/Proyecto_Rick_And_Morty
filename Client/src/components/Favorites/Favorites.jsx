import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { filterCards, orderCards } from "../../redux/actions"
import { useDispatch } from "react-redux"
import { useState } from "react"
import Card from "../Card/Card"


const Favorites = () => {

    const [aux, setAux] = useState(false)

    const dispatch = useDispatch()

    const handleOrder = event => {
        dispatch(orderCards(event.target.value))
        setAux(true)
    };

    const handleFilter = event => {
        dispatch(filterCards(event.target.value))
    }

    const characters = useSelector(state =>state.myFavorites)
    return( 
        <div>
            <select onChange={handleOrder}>
                <option value="A">A</option>
                <option value = "D">D</option>
            </select>
            <select onChange={handleFilter}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Genderless">Genderless</option>
                <option value="unknown">unknown</option>
                <option value="AllCharacters">AllCharacters</option>
            </select>
            {
                characters.map(character=>{
                    return(
                        
                        <div key = {character.id}>
                            <Card
                            key={character.id}
                            id={character.id}
                            name={character.name}
                            status={character.status}
                            species={character.species}
                            gender={character.gender}
                            origin={character.origin}
                            image={character.image}
                            />
                            {/* <Link to = {`/detail/${character.id}`}>
                                <h2>{character.name}</h2>
                            </Link>
                            <h2>{character.status}</h2>
                            <h2>{character.species}</h2>
                            <h2>{character.gender}</h2>
                            <h2>{character.origin}</h2>
                            <img src={character.image} alt='' /> */}
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default Favorites