import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./action-types"

const initialState = {
    myFavorites : [],
    allCharacters : [],
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_FAV:
            return { ...state, myFavorites: action.payload, allCharacters: action.payload };

        case REMOVE_FAV:
            return { ...state, myFavorites: action.payload, allCharacters: action.payload };

        case FILTER : 
            const genderFiltered = state.allCharacters.filter(character => character.gender === action.payload)
            return{
                ...state,
                myFavorites : action.payload === "AllCharacters"
                ? [...state.allCharacters]
                : genderFiltered
            }
        case ORDER : 
            const allCharactersOrder = [...state.allCharacters];
            return {
                ...state,
                myFavorites : action.payload==="A" 
                ? allCharactersOrder.sort((a,b)=>a.id - b.id)
                : allCharactersOrder.sort((a,b)=>b.id - a) 
            }
            
        default : 
            return{
                ...state
            }        
}
}

export default reducer