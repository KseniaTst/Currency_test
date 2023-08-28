import { AnyAction, combineReducers, configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { headerSlice } from '../components/Header/header-slice'
import { mainSlice } from '../components/Main/main-slice'

const RootReducer = combineReducers({
	header: headerSlice.reducer,
	main: mainSlice.reducer,
})

export const store = configureStore({
	reducer: RootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})

export type RootStateType = ReturnType<typeof store.getState>
export type DispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType,
	RootStateType,
	unknown,
	AnyAction>
