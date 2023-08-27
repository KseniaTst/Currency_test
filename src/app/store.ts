import {combineReducers, configureStore} from "@reduxjs/toolkit";

const RootReducer = combineReducers({

})

export const store = configureStore({
    reducer: RootReducer,
})

