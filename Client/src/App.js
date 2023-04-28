import './App.css';
import { useEffect, useState } from 'react';
import Cards from './components/Cards/Cards.jsx';
import Nav from "./components/Nav/Nav";
import axios from 'axios';
import { Routes, Route, useLocation } from "react-router-dom"
import About from './components/About/About';
import Detail from "./components/Detail/Detail"
import Forms from './components/Forms/Forms';
import { useNavigate } from 'react-router-dom';
import Favorites from './components/Favorites/Favorites';



function App() {


   const [characters, setCharacters] = useState([])

   const [access, setAccess] = useState(false)

   // let email = "chrismai1020162016@hotmail.com"
   // let password = "patito232"

   const navigate = useNavigate();

   async function login(userData) {
      try
      {
      const { email, password } = userData;
      const URL = 'http://localhost:3001/rickandmorty/login/';
      const promise = await axios(URL + `?email=${email}&password=${password}`)
         const { access } = promise.data;
         setAccess(access);
         access && navigate('/home');
      }catch(error){
         throw error
      }
   }

   const logOut = () => {
      setAccess(false)
      navigate("/")
   }

   useEffect(() => {
      !access && navigate('/');
   }, [access, navigate]);

   const baseURL = 'http://localhost:3001/rickandmorty/character'
   // const apiKey = "4e059e210841.7e56ffdcb99a37707496"

   const onSearch = async (id) => {
      const {data} = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
      const characterRepited = characters.find(char => char===data.name)
      try{
         if (data===characterRepited){
            window.alert("Ese personaje ya fue agregado")
         }
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]); 
         }
         else {
            window.alert('¡No hay personajes con este ID!');
         }
   }  catch(error){
      throw new Error(error)
   }
}


   const onSearchRandom = () => {
      let randomCharacter = Math.floor(Math.random() * (826 - 1 + 1) + 1)
      axios(`${baseURL}/${randomCharacter}`)
         .then(({ data }) => {
            if (data.name) {
               setCharacters((oldChars) => [...oldChars, data])
            }
         })
         .catch(error => {throw new Error(error)})
   }

   const onClose = (id) => {
      const searchId = characters.filter(character => {
         return character.id !== id
      })
      setCharacters(searchId)
   }

   let location = useLocation();
   console.log(location)


   return (
      <div className='App'>
         {location.pathname !== "/" && <Nav onSearch={onSearch} onSearchRandom={onSearchRandom} logOut={logOut}/>}
         <Routes>
            <Route path='/' element={<Forms login={login} />} />
            <Route path="/home" element={<Cards characters={characters} onClose={onClose} />} />
            <Route path="/about" element={<About />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path="/favorites" element={<Favorites />} />

         </Routes>
      </div>
   );
}

export default App;
