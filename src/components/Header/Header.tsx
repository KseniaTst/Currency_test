import { AppBar, Toolbar } from '@mui/material'
import style from './header.module.scss'
import { Portfolio } from '../Currency-portfolio/Portfolio'
import { useAppSelector } from '../../common/hooks/use-app-selector'

export const Header = () => {

	const currencies = useAppSelector((state) => state.header.headerData.currencies)
	const totalPrice = useAppSelector(state => state.portfolio.portfolioData.totalPrice)
	const previousTotalPrice = useAppSelector(state => state.portfolio.previousTotalPrice)
	const difference = (totalPrice - previousTotalPrice).toFixed(2)
	let pesentageDiff: string | number = (totalPrice / previousTotalPrice * 100 - 100).toFixed(2)

	if (previousTotalPrice === 0)  pesentageDiff = 0

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
					<p>{difference}</p>
					<p>({pesentageDiff}%)</p>
					<Portfolio />
				</div>
			</AppBar>
		</>
	)
}