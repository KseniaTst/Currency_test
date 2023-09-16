import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'

import { getTotalPrice } from '../common/utils/getTotalPrice'

import { CurrencyType, ResponseGetCurrType } from '../services/headerApi'
import { portfolioApi } from '../services/portfolioApi'
import { ThunkType } from '../store/store'

const initialState = {
	portfolioData: {
		currencies: [] as CurrencyType[],
		totalPrice: 0,
		difference: 0,
		percentageDiff: '',
	},
	previousTotalPrice: 0,
	currencyAmount: [] as CurrencyAmount[],
}

export const portfolioSlice = createSlice({
	name: 'portfolio',
	initialState,
	reducers: {
		loadCurrencies(state, action: PayloadAction<LoadCurrType>) {
			state.portfolioData.currencies = action.payload.currencies
			state.previousTotalPrice = action.payload.previousTotalPrice
			state.portfolioData.totalPrice = getTotalPrice(
				state.portfolioData.currencies
			)
		},
		setCurrToProfile(state, action: PayloadAction<setCurrToProfileType>) {
			state.portfolioData.currencies.push(action.payload.currency)
			state.portfolioData.totalPrice = getTotalPrice(
				state.portfolioData.currencies
			)
			state.currencyAmount.push({
				key: action.payload.currency.id,
				amount: Number(action.payload.amount),
			})
		},
		removeCurrency(state, action: PayloadAction<RemoveCurrPayloadType>) {
			const index = state.portfolioData.currencies.findIndex(
				curr => curr.id === action.payload.id
			)
			if (index !== -1) {
				state.portfolioData.currencies.splice(index, 1)
				state.portfolioData.totalPrice =
					state.portfolioData.totalPrice - Number(action.payload.price)
			}
		},
		changeCurrPrice(state, action: PayloadAction<ChangeCurrPayloadType>) {
			state.portfolioData.currencies.map(curr => {
				if (curr.id === action.payload.id) {
					const newPrice = Number(curr.priceUsd) + action.payload.price
					state.portfolioData.totalPrice =
						state.portfolioData.totalPrice + action.payload.price
					return (curr.priceUsd = newPrice.toString())
				}
			})
		},
	},
})

export const {
	setCurrToProfile,
	removeCurrency,
	changeCurrPrice,
	loadCurrencies,
} = portfolioSlice.actions

export const getCurrToProfileThunk =
	(amount: number, currency: CurrencyType): ThunkType =>
	(dispatch, getState) => {
		const price = Number(currency.priceUsd) * amount
		const updCurrency = { ...currency, priceUsd: price.toString() }
		const id = getState().portfolio.portfolioData.currencies.find(
			el => el.id === currency.id
		)

		if (amount >= 0.0001) {
			if (id) {
				dispatch(changeCurrPrice({ id: currency.id, price: price }))
				return
			}
			return dispatch(setCurrToProfile({ currency: updCurrency, amount }))
		}
		alert('The amount should be more than 0.0001')
	}
export const loadCurrToProfileThunk =
	(
		currencies: string[],
		previousTotalPrice: number,
		amount: CurrencyAmount[]
	): ThunkType =>
	dispatch => {
		if (currencies.length === 0) return

		portfolioApi
			.getPortfolioCurr(currencies)
			.then((res: AxiosResponse<ResponseGetCurrType>) => {
				res.data.data.map(curr => {
					amount.map(el => {
						if (curr.id === el.key) {
							return (curr.priceUsd = (
								Number(curr.priceUsd) * el.amount
							).toString())
						}
					})
				})
				dispatch(
					loadCurrencies({ currencies: res.data.data, previousTotalPrice })
				)
			})
			.catch(error => {
				alert(error)
			})
	}

type ChangeCurrPayloadType = {
	id: string
	price: number
}
type RemoveCurrPayloadType = {
	id: string
	price: string
}
type LoadCurrType = {
	currencies: CurrencyType[]
	previousTotalPrice: number
}
type CurrencyAmount = {
	key: string
	amount: number
}

type setCurrToProfileType = {
	currency: CurrencyType
	amount: number
}
