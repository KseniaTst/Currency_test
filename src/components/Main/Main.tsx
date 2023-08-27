import { CurrencyTable } from './Currency-table'
import style from './main.module.scss'

export const Main = () => {

	return (
		<div className={style.container}>
			<CurrencyTable />
		</div>
	)
}