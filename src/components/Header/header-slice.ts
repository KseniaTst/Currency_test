import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrencyType, headerApi, ResponseGetCurrType } from './header-api'
import { ThunkType } from '../../app/store'
import { AxiosResponse } from 'axios'

const initialState = {
	headerData: {
		currencies: [] as CurrencyType[],
		profile: {
			totalPrice: 0,
			difference: '',
			percentageDiff: ''
		}
	},
}

export const headerSlice = createSlice({
	name: 'header',
	initialState,
	reducers: {
		setPopularCurrencies(state, action: PayloadAction<CurrencyType[]>) {
			state.headerData.currencies = action.payload
		},
	},
})

export const { setPopularCurrencies } = headerSlice.actions

export const getPopularCurrThunk =
	(): ThunkType =>
		(dispatch) => {
			headerApi
				.getPopularСurr()
				.then((res: AxiosResponse<ResponseGetCurrType>) => {
					dispatch(setPopularCurrencies(res.data.data))
				})
				.catch((error) => {
					alert(error)
				})
		}