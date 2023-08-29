import { AppBar, Toolbar } from '@mui/material'
import style from './header.module.scss'
import { Portfolio } from '../Currency-portfolio/Portfolio'
import { useAppSelector } from '../../common/hooks/useAppSelector'

export const Header = () => {

	const currencies = useAppSelector((state) => state.header.headerData.currencies)
	const totalPrice = useAppSelector(state => state.portfolio.portfolioData.totalPrice)

	return (
		<>
			<AppBar className={style.container}>
				<Toolbar>
					{
						currencies.map((curr) => {
							const currencyPrice = Number(curr.priceUsd).toFixed(4)

							return <div key={curr.id} className={style.currBlock}>
								<h6>{currencyPrice} USD</h6>
								<p>{curr.name}</p>
							</div>
						})
					}
				</Toolbar>
				<div className={style.profileBlock}>
					<h6>{totalPrice.toFixed(4)} USD</h6>
					<Portfolio />
				</div>
			</AppBar>
		</>
	)
}