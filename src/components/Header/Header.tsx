import { AppBar, Toolbar } from '@mui/material'
import style from './header.module.scss'
import { Portfolio } from '../Currency-portfolio/Portfolio'

export const Header = () => {

	return (
		<>
			<AppBar className={style.container}>
				<Toolbar>
					<p>a</p>
					<p>b</p>
					<p>c</p>
				</Toolbar>
				<Portfolio />
			</AppBar>
		</>
	)
}