import { useEffect } from 'react'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { getCurrencyThunk, getHistoryThunk } from '../mainSlice'
import { NavLink, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { Chart } from '../../../common/components/Chart'
import style from './currencyPage.module.scss'
import { AddCurrencyModal } from '../addCurrencyModal/AddCurrencyModal'
import { CurrencyType } from '../../../services/headerApi'
import { getCurrToProfileThunk } from '../../CurrencyPortfolio/portfolioSlice'

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
				<ul className={style.currPageList}>
					<li>Symbol: {currency.symbol}</li>
					<li>Supply: {currency.supply}</li>
					<li>Price: {currency.priceUsd} USD</li>
					<li>Rank: {currency.rank}</li>
					<li>Change: {currency.changePercent24Hr} %</li>
					<li>Total amount: {currency.marketCapUsd} USD</li>
					<li>Max supply: {currency.maxSupply}</li>
				</ul>
				<h6>History:</h6>
				<Chart data={history} />
			</div>
		</section>
	)
}