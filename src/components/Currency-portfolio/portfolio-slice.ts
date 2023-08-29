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
const getTotalPrice = (arr: any) => arr.reduce((sum: number, obg: any) => Number(obg.priceUsd) + sum, 0)

export const portfolioSlice = createSlice({
	name: 'portfolio',
	initialState,
	reducers: {
		loadCurrencies (state, action:PayloadAction<CurrencyType[]>){
			state.portfolioData.currencies = action.payload
			state.portfolioData.totalPrice = getTotalPrice(state.portfolioData.currencies)

		},
		setCurrToProfile(state, action: PayloadAction<CurrencyType>) {
			state.portfolioData.currencies.push(action.payload)
			state.portfolioData.totalPrice = getTotalPrice(state.portfolioData.currencies)
		},
		removeCurrency(state, action: PayloadAction<RemoveCurrPayloadType>) {
			const index = state.portfolioData.currencies.findIndex(curr => curr.id === action.payload.id)
			if (index !== -1) {
				state.portfolioData.currencies.splice(index, 1)
				state.portfolioData.totalPrice = state.portfolioData.totalPrice - Number(action.payload.price)

			}
		},
		changeCurrPrice(state, action: PayloadAction<ChangeCurrPayloadType>) {
			state.portfolioData.currencies.map(curr => {
				if (curr.id === action.payload.id) {
					const newPrice = Number(curr.priceUsd) + action.payload.price
					state.portfolioData.totalPrice = state.portfolioData.totalPrice + action.payload.price
					return curr.priceUsd = newPrice.toString()

				}
			})
		},
	},
})

export const { setCurrToProfile, removeCurrency, changeCurrPrice, loadCurrencies } = portfolioSlice.actions

export const getCurrToProfileThunk = (amount: number, currency: CurrencyType): ThunkType =>
	(dispatch, getState) => {

		const price = Number(currency.priceUsd) * amount

		const updCurrency = { ...currency, priceUsd: price.toString() }
		const id = getState().portfolio.portfolioData.currencies.find(el => el.id === currency.id)
		if (amount > 0) {
			if (id) {
				dispatch(changeCurrPrice({ id: currency.id, price: price }))
				return
			}
			dispatch(setCurrToProfile(updCurrency))

		}
	}

type ChangeCurrPayloadType = {
	id: string,
	price: number
}
type RemoveCurrPayloadType = {
	id: string,
	price: string
}