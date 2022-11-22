import { INSERT_DATA_REDUX } from "../constants/bookConstants";

export const setBooks=(books)=>{
    return{
        type:INSERT_DATA_REDUX,
        payload:books
    }
}