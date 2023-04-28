import { Link, useLocation } from "react-router-dom";
import { useState, useEffect,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../../redux/actions";


export default function Card({id,name,status,species,gender,origin,image,onClose}) {
   
   const dispatch = useDispatch()
   const favorites = useSelector(state => state.myFavorites)
   
   const [isFav, setIsFav] = useState(false)

   const location = useLocation()

   useEffect(()=>{
      for(let i = 0; i<favorites.length; i++){
         if(favorites[i].id === id){
            setIsFav(true)
         }
      }
   },[favorites,id])

   const handleFavorite = () => {
      if (isFav){
         setIsFav(false)
         dispatch(removeFav(id))
      }
      else{
         setIsFav(true)
         dispatch(addFav({id,name,status,species,gender,origin,image,onClose}))
      }
   }

   const handleDelete = () => {
      setIsFav(false)
      dispatch(removeFav(id))
   }

   return (
      <div>
         {
            isFav ? (
               <button onClick={handleFavorite}>❤️</button>
            ) : (
               <button onClick={handleFavorite}>🤍</button>
         )
         }
         {location.pathname==="/home"&&<button onClick={()=>{onClose(id);handleDelete()}}>X</button>  }
         <Link to = {`/detail/${id}`}>
         <h2>{name}</h2>
         </Link>
         <h2>{status}</h2>
         <h2>{species}</h2>
         <h2>{gender}</h2>
         <h2>{origin}</h2>
         <img src={image} alt='' />
      </div>
   );
}

// export const mapDispatchToProps = dispatch => {
//    return {
//       addFav : () => dispatch(addFav()),
//       removeFav : () => dispatch(removeFav())
//    }
// }