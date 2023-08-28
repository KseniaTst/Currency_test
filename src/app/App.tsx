import React, { useEffect } from 'react'
import './App.css'
import { Header } from '../components/Header/Header'
import { Main } from '../components/Main/Main'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { getPopularCurrThunk } from '../components/Header/header-slice'
import { getCurrenciesThunk } from '../components/Main/main-slice'

function App() {

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getPopularCurrThunk())
		dispatch(getCurrenciesThunk())
	}, [])

	return (
		<div className='App'>
			<Header />
			<Main />
		</div>
	)
}

export default App
