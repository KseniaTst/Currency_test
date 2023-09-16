import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { getCurrToProfileThunk } from '../../slices/portfolioSlice'

import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'

import { CurrencyType } from '../../services/headerApi'

import { TablePagination } from './Pagination/TablePagination'
import { AddCurrencyModal } from './addCurrencyModal/AddCurrencyModal'

import style from './main.module.scss'

export const CurrencyTable = () => {
	const dispatch = useAppDispatch()

	const currencies = useAppSelector(state => state.main.mainData.currencies)
	const currencyAmount = useAppSelector(state => state.portfolio.currencyAmount)

	const addCurrToProfile = async (amount: number, currency: CurrencyType) => {
		await dispatch(getCurrToProfileThunk(amount, currency))
	}

	useEffect(() => {
		if (currencyAmount.length > 0)
			localStorage.setItem('storedCurrAmounts', JSON.stringify(currencyAmount))
	}, [currencyAmount])

	return (
		<section>
			<table className={style.mainTable}>
				<thead>
					<tr>
						<th className={style.mainTable__head}>Name</th>
						<th className={style.mainTable__head}>Price USD</th>
						<th className={style.mainTable__head}>Supply</th>
						<th className={style.mainTable__head}>Add</th>
					</tr>
				</thead>
				<tbody>
					{currencies.map(curr => {
						const price = Number(curr.priceUsd).toFixed(4)
						const supply = Number(curr.supply).toFixed(4)
						return (
							<tr key={curr.id}>
								<td className={style.mainTable__data}>
									<NavLink
										className={style.mainTable__navLink}
										to={`/${curr.id}`}
									>
										{curr.name}
									</NavLink>
								</td>
								<td className={style.mainTable__data}>{price}</td>
								<td className={style.mainTable__data}>{supply}</td>
								<td className={style.mainTable__data}>
									<AddCurrencyModal
										addCurrToProfile={addCurrToProfile}
										currency={curr}
									/>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<TablePagination />
		</section>
	)
}
