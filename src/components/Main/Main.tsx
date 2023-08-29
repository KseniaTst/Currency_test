import style from './main.module.scss'
import { Routing } from '../routing/Routing'

export const Main = () => {

	return (
		<div className={style.container}>
			<Routing />
		</div>
	)
}