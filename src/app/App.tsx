import React, { useEffect } from 'react'
import { Header } from '../components/Header/Header'
import { Main } from '../components/Main/Main'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { getPopularCurrThunk } from '../components/Header/headerSlice'
import { getCurrenciesThunk } from '../components/Main/mainSlice'
import { loadCurrToProfileThunk } from '../components/CurrencyPortfolio/portfolioSlice'

function App() {

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getPopularCurrThunk())
		dispatch(getCurrenciesThunk())
			const currencies: string[] = JSON.parse(localStorage.getItem('storedCurrencies') || '')
			const previousTotalPrice = JSON.parse(localStorage.getItem('storedTotalPrice') || '')
			const amount = JSON.parse(localStorage.getItem('storedCurrAmounts') || '')
			dispatch(loadCurrToProfileThunk(currencies, previousTotalPrice, amount))
	}, [])

	return (
		<div >
			<Header />
			<Main />
		</div>
	)
}

export default App
