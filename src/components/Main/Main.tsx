import { Routing } from '../routing/Routing'

import style from './main.module.scss'

export const Main = () => {
	return (
		<div className={style.wrapper}>
			<Routing />
		</div>
	)
}
