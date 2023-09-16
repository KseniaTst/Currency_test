import React, { useEffect } from 'react'

import { getPopularCurrThunk } from '../slices/headerSlice'
import { getCurrenciesThunk } from '../slices/mainSlice'
import { loadCurrToProfileThunk } from '../slices/portfolioSlice'

import { useAppDispatch } from '../common/hooks/useAppDispatch'

import { Header } from '../components/Header/Header'
import { Main } from '../components/Main/Main'

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getPopularCurrThunk())
		dispatch(getCurrenciesThunk())
		if (localStorage.getItem('storedCurrencies')) {
			const currencies: string[] = JSON.parse(
				localStorage.getItem('storedCurrencies') || ''
			)
			const previousTotalPrice = JSON.parse(
				localStorage.getItem('storedTotalPrice') || ''
			)
			const amount = JSON.parse(localStorage.getItem('storedCurrAmounts') || '')
			dispatch(loadCurrToProfileThunk(currencies, previousTotalPrice, amount))
		}
	}, [])

	return (
		<div>
			<Header />
			<Main />
		</div>
	)
}

export default App
