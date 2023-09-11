import { useEffect } from 'react'
import { useAppDispatch } from '../../../common/hooks/use-app-dispatch'
import { getCurrencyThunk, getHistoryThunk } from '../main-slice'
import { NavLink, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../common/hooks/use-app-selector'
import { List, ListItem } from '@mui/material'
import { Chart } from '../../../common/conponents/Chart'
import style from './currency-page.module.scss'
import { AddCurrencyModal } from '../add-currency-modal/Add-currency-modal'
import { CurrencyType } from '../../Header/header-api'
import { getCurrToProfileThunk } from '../../Currency-portfolio/portfolio-slice'

export const CurrencyPage = () => {
	const params = useParams()
	const dispatch = useAppDispatch()
	const currencyId = params.id

	const currency = useAppSelector(state => state.main.mainData.selectedCurrency)
	const history = useAppSelector(state => state.main.mainData.currencyHistory)
	const currencyAmount = useAppSelector(state => state.portfolio.currencyAmount)


	const addCurrToProfile = (amount: number, currency: CurrencyType) => {
		dispatch(getCurrToProfileThunk(amount, currency))
	}

	useEffect(() => {
		if (currencyId) {
			dispatch(getCurrencyThunk(currencyId))
			dispatch(getHistoryThunk(currencyId))
		}
	}, [])

	useEffect(() => {
		if (currencyAmount.length > 0)
			localStorage.setItem('storedCurrAmounts', JSON.stringify(currencyAmount))
	}, [currencyAmount])


	return (
		<section className={style.currPageContainer}>
			<div className={style.backButton}>
				<NavLink to={'/'}>
					<p><i className={style.arrowLeft}/>back</p>
				</NavLink>
			</div>
			<h2>{currency.name}</h2>
			<AddCurrencyModal addCurrToProfile={addCurrToProfile} currency={currency} />
			<div className={style.pageBlock}>
				<List>
					<ListItem>Symbol: {currency.symbol}</ListItem>
					<ListItem>Supply: {currency.supply}</ListItem>
					<ListItem>Price: {currency.priceUsd} USD</ListItem>
					<ListItem>Rank: {currency.rank}</ListItem>
					<ListItem>Change: {currency.changePercent24Hr} %</ListItem>
					<ListItem>Total amount: {currency.marketCapUsd} USD</ListItem>
					<ListItem>Max supply: {currency.maxSupply}</ListItem>
				</List>
				<h6>History:</h6>
				<Chart data={history} />
			</div>
		</section>
	)
}