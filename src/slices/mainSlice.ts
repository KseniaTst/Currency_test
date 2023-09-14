import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThunkType } from '../store/store'
import { AxiosResponse } from 'axios'
import { HistoryType, mainApi } from '../services/mainApi'
import { CurrencyType, ResponseGetCurrType } from '../services/headerApi'

const initialState = {
	mainData: {
		currencies: [] as CurrencyType[],
		selectedCurrency: {} as CurrencyType,
		currencyHistory: [] as HistoryType [],
	},
}

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setCurrencies(state, action: PayloadAction<CurrencyType[]>) {
			state.mainData.currencies = action.payload
		},
		setCurrency(state, action: PayloadAction<CurrencyType>) {
			state.mainData.selectedCurrency = action.payload
		},
		setHistory(state, action: PayloadAction<HistoryType[]>) {
			state.mainData.currencyHistory = action.payload
		},
	},
})

export const { setCurrencies, setCurrency, setHistory } = mainSlice.actions

export const getCurrenciesThunk = (offset?: number): ThunkType =>
	(dispatch) => {
		mainApi
			.getCurrencies(offset)
			.then((res: AxiosResponse<ResponseGetCurrType>) => {
				dispatch(setCurrencies(res.data.data))
			})
			.catch((error) => {
				alert(error)
			})
	}
export const getCurrencyThunk = (id: string): ThunkType =>
	(dispatch) => {
		mainApi
			.getCurrency(id)
			.then((res: AxiosResponse) => {
				dispatch(setCurrency(res.data.data))
			})
			.catch((error) => {
				alert(error)
			})
	}
export const getHistoryThunk = (id: string): ThunkType =>
	(dispatch) => {
		mainApi
			.getCurrencyHistory(id)
			.then((res: AxiosResponse) => {
				const history = res.data.data.slice(-10)
				dispatch(setHistory(history))
			})
			.catch((error) => {
				alert(error)
			})
	}