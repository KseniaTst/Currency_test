import { Routes, Route } from 'react-router-dom'
import { Path } from '../../common/enums/Path'
import { CurrencyPage } from '../Main/Currency-page'
import { CurrencyTable } from '../Main/Currency-table'

export const Routing = () => {
	return (
		<Routes>
			<Route path={'/'} element={<CurrencyTable />} />
			<Route path={Path.CurrencyPage} element={<CurrencyPage />} />
		</Routes>
	)
}
