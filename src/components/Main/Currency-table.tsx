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

export const CurrencyTable = () => {


	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell width={'200px'}>Name</TableCell>
						<TableCell width={'50px'}>
							Price $
						</TableCell>
						<TableCell align='center' width={'100px'}>
							Last updated
						</TableCell>
						<TableCell align='center' width={'100px'}>
							Add
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell> Bitcoin</TableCell>
						<TableCell>20000</TableCell>
						<TableCell>26.08.2023 21:55</TableCell>
						<TableCell align={'center'}>
							<AddCurrencyModal />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	)
}