import { AddCurrencyModal } from './addCurrencyModal/AddCurrencyModal'
import style from './main.module.scss'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { getCurrToProfileThunk } from '../CurrencyPortfolio/portfolioSlice'
import { CurrencyType } from '../../services/headerApi'
import { TablePagination } from './Pagination/TablePagination'
import { useEffect } from 'react'

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
			<table className={style.tableContainer}>
				<thead>
				<tr>
					<th>Name</th>
					<th>
						Price USD
					</th>
					<th>
						Supply
					</th>
					<th>
						Add
					</th>
				</tr>
				</thead>
				<tbody>
				{currencies.map(curr => {
					const price = Number(curr.priceUsd).toFixed(4)
					const supply = Number(curr.supply).toFixed(4)
					return (
						<tr key={curr.id}>
							<td><NavLink to={`/${curr.id}`}>{curr.name}</NavLink></td>
							<td>{price}</td>
							<td>{supply}</td>
							<td>
								<AddCurrencyModal addCurrToProfile={addCurrToProfile} currency={curr} />
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