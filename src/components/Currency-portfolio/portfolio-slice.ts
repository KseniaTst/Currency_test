import { CurrencyType } from '../Header/header-api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThunkType } from '../../app/store'

const initialState = {
	portfolioData: {
		currencies: [] as CurrencyType[],
		totalPrice: 0,
		difference: 0,
		percentageDiff: '',
	},
}

export const portfolioSlice = createSlice({
	name: 'portfolio',
	initialState,
	reducers: {
		setCurrToProfile(state, action: PayloadAction<CurrencyType>) {
			state.portfolioData.currencies.push(action.payload)
		},
		removeCurrency(state, action: PayloadAction<string>) {
			const index = state.portfolioData.currencies.findIndex(curr => curr.id === action.payload)
			if (index !== -1) {
				state.portfolioData.currencies.splice(index, 1)
			}
		},
	},
})

export const { setCurrToProfile, removeCurrency } = portfolioSlice.actions

export const getCurrToProfileThunk = (amount: number, currency: CurrencyType): ThunkType =>
	(dispatch) => {
		dispatch(setCurrToProfile(currency))
	}