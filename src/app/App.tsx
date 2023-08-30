import React, { useEffect } from 'react'
import './App.css'
import { Header } from '../components/Header/Header'
import { Main } from '../components/Main/Main'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { getPopularCurrThunk } from '../components/Header/header-slice'
import { getCurrenciesThunk } from '../components/Main/main-slice'
import { loadCurrToProfileThunk } from '../components/Currency-portfolio/portfolio-slice'

function App() {

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getPopularCurrThunk())
		dispatch(getCurrenciesThunk())
		let currencies = []
		if (localStorage.getItem('storedCurrencies') && localStorage.getItem('storedTotalPrice')) {
			// @ts-ignore
			currencies = JSON.parse(localStorage.getItem('storedCurrencies'))
			// @ts-ignore
			const previousTotalPrice = JSON.parse(localStorage.getItem('storedTotalPrice'))
			// @ts-ignore
			const amount = JSON.parse(localStorage.getItem('storedCurrAmounts'))
			dispatch(loadCurrToProfileThunk(currencies, previousTotalPrice, amount))
		}
	}, [])

	return (
		<div className='App'>
			<Header />
			<Main />
		</div>
	)
}

export default App
