import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";



const Detail = () => {

   let { id } = useParams()

   const baseURL = 'http://localhost:3001/rickandmorty/character'
   const apiKey = "4e059e210841.7e56ffdcb99a37707496" 


   const [character, setCharacter] = useState({})

   useEffect(() => {
      axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
         if (data.name) {
            setCharacter(data);
         } else {
            window.alert('No hay personajes con ese ID');
         }
      });
      return setCharacter({});
   }, [id]);

   return (
      <div>
         <h1>{character?.name}</h1>
         <p>{character?.status}</p>
         <p>{character?.gender}</p>
         <p>{character?.specie}</p>
         <p>{character.origin?.name}</p>
         <img src={character?.image} alt = {character.name}></img>
      </div>
   )
   }

export default Detail