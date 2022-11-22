import { reducers } from "./reducers/index";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose} from "redux";

const initialState = {
    library:{
        books:localStorage.getItem('books')
        ? JSON.parse(localStorage.getItem('books'))
        :[]
    }
}

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose
const store = createStore(
    reducers,
    initialState,
    composeEnchancer(applyMiddleware(thunk))
)

export default store
