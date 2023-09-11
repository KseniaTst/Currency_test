import {
	TableBody,
	TableContainer,
	TableHead,
	Table,
	TableRow,
	TableCell,
	Paper,
} from '@mui/material'
import { AddCurrencyModal } from './add-currency-modal/Add-currency-modal'
import style from './main.module.scss'
import { useAppSelector } from '../../common/hooks/use-app-selector'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../common/hooks/use-app-dispatch'
import { getCurrToProfileThunk } from '../Currency-portfolio/portfolio-slice'
import { CurrencyType } from '../Header/header-api'
import { TablePagination } from './Pagination/Table-pagination'
import { useEffect } from 'react'

export const CurrencyTable = () => {

	const dispatch = useAppDispatch()

	const currencies = useAppSelector(state => state.main.mainData.currencies)
	const currencyAmount = useAppSelector(state => state.portfolio.currencyAmount)


	const addCurrToProfile = async (amount: number, currency: CurrencyType) => {
		await dispatch(getCurrToProfileThunk(amount, currency))

	}

	useEffect(()=> {
		if (currencyAmount.length > 0)
			localStorage.setItem('storedCurrAmounts', JSON.stringify(currencyAmount))
	}, [currencyAmount])

	return (
		<section>
		<TableContainer component={Paper} className={style.tableContainer}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell width={'100px'}>Name</TableCell>
						<TableCell width={'50px'}>
							Price USD
						</TableCell>
						<TableCell align='center' width={'70px'}>
							Supply
						</TableCell>
						<TableCell align='center' width={'100px'}>
							Add
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{currencies.map(curr => {
						const price = Number(curr.priceUsd).toFixed(4)
						const supply = Number(curr.supply).toFixed(4)
						return (
							<TableRow>
								<TableCell><NavLink to={`/${curr.id}`}>{curr.name}</NavLink></TableCell>
								<TableCell>{price}</TableCell>
								<TableCell>{supply}</TableCell>
								<TableCell align={'center'}>
									<AddCurrencyModal addCurrToProfile={addCurrToProfile} currency={curr} />
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
			<TablePagination/>
		</section>
	)
}