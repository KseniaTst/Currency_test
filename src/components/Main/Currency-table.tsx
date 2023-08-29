import {
	TableBody,
	TableContainer,
	TableHead,
	Table,
	TableRow,
	TableCell,
	Paper,
} from '@mui/material'
import { AddCurrencyModal } from './addCurrencyModal/Add-currency-modal'
import style from './main.module.scss'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { getCurrToProfileThunk } from '../Currency-portfolio/portfolio-slice'
import { CurrencyType } from '../Header/header-api'
import { TablePagination } from './TablePagination'

export const CurrencyTable = () => {

	const dispatch = useAppDispatch()

	const currencies = useAppSelector(state => state.main.mainData.currencies)


	const addCurrToProfile = (amount: number, currency: CurrencyType) => {
		dispatch(getCurrToProfileThunk(amount, currency))
	}

	return (
		<>
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
		</>
	)
}