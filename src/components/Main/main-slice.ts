import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThunkType } from '../../app/store'
import { AxiosResponse } from 'axios'
import { mainApi } from './main-api'
import { CurrencyType, ResponseGetCurrType } from '../Header/header-api'

const initialState = {
	mainData: {
		currencies: [] as CurrencyType[],
	},
}

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setCurrencies(state, action: PayloadAction<CurrencyType[]>) {
			state.mainData.currencies = action.payload
		},
	},
})

export const { setCurrencies } = mainSlice.actions

export const getCurrenciesThunk = (): ThunkType =>
	(dispatch) => {
		mainApi
			.getCurrencies()
			.then((res: AxiosResponse<ResponseGetCurrType>) => {
				dispatch(setCurrencies(res.data.data))
			})
			.catch((error) => {
				alert(error)
			})
	}