import { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import { getCurrencyThunk, getHistoryThunk } from '../../../slices/mainSlice'
import { getCurrToProfileThunk } from '../../../slices/portfolioSlice'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'

import { Chart } from '../../../common/components/Chart'

import { CurrencyType } from '../../../services/headerApi'
import { AddCurrencyModal } from '../addCurrencyModal/AddCurrencyModal'

import style from './currencyPage.module.scss'

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
		<section className={style.currPage}>
			<div className={style.currPage__backButtonWrapper}>
				<NavLink to={'/'}>
					<p>
						<i className={style.currPage__arrowLeft} />
						back
					</p>
				</NavLink>
			</div>
			<h2 className={style.currPage__name}>{currency.name}</h2>
			<AddCurrencyModal
				addCurrToProfile={addCurrToProfile}
				currency={currency}
			/>
			<div className={style.currPage__info}>
				<ul className={style.currPage__list}>
					<li>Symbol: {currency.symbol}</li>
					<li>Supply: {currency.supply}</li>
					<li>Price: {currency.priceUsd} USD</li>
					<li>Rank: {currency.rank}</li>
					<li>Change: {currency.changePercent24Hr} %</li>
					<li>Total amount: {currency.marketCapUsd} USD</li>
					<li>Max supply: {currency.maxSupply}</li>
				</ul>
				<h6 className={style.currPage__history}>History:</h6>
				<Chart data={history} />
			</div>
		</section>
	)
}
