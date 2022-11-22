import { INSERT_DATA_REDUX } from "../constants/bookConstants";

const initialState = {
    books:[]
}

export const bookReducer = (state=initialState, {type, payload})=>{
    switch(type){
        case INSERT_DATA_REDUX:
            return {...state, books:payload}
        
            default:
                return state
    }
}