import React, { useEffect } from 'react'
import './App.css'
import { Header } from '../components/Header/Header'
import { Main } from '../components/Main/Main'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { getPopularCurrThunk } from '../components/Header/header-slice'
import { getCurrenciesThunk } from '../components/Main/main-slice'
import { loadCurrencies } from '../components/Currency-portfolio/portfolio-slice'

function App() {

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getPopularCurrThunk())
		dispatch(getCurrenciesThunk())
		let currencies = []
		if (localStorage.getItem('storedCurrencies') !==null) {
			// @ts-ignore
			currencies = JSON.parse(localStorage.getItem('storedCurrencies'))
			dispatch(loadCurrencies(currencies))
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
