import { useAppSelector } from '../../common/hooks/useAppSelector'

import { Portfolio } from '../CurrencyPortfolio/Portfolio'

import style from './header.module.scss'

export const Header = () => {
	const currencies = useAppSelector(state => state.header.headerData.currencies)
	const totalPrice = useAppSelector(
		state => state.portfolio.portfolioData.totalPrice
	)
	const previousTotalPrice = useAppSelector(
		state => state.portfolio.previousTotalPrice
	)
	const difference = (totalPrice - previousTotalPrice).toFixed(2)
	let pesentageDiff: string | number = (
		(totalPrice / previousTotalPrice) * 100 -
		100
	).toFixed(2)

	if (previousTotalPrice === 0) pesentageDiff = 0

	return (
		<header className={style.header}>
			<div className={style.header__popularCurrWrapper}>
				{currencies.map(curr => {
					const currencyPrice = Number(curr.priceUsd).toFixed(4)

					return (
						<div key={curr.id} className={style.header__currBlock}>
							<h6 className={style.header__currencyPrice}>
								{currencyPrice} USD
							</h6>
							<p className={style.header__currencyName}>{curr.name}</p>
						</div>
					)
				})}
			</div>
			<div className={style.header__profileWrapper}>
				<h6 className={style.header__profileWrapper__totalPrice}>
					{totalPrice.toFixed(4)} USD
				</h6>
				<p className={style.header__profileWrapper__text}>{difference}</p>
				<p className={style.header__profileWrapper__text}>({pesentageDiff}%)</p>
				<Portfolio />
			</div>
		</header>
	)
}
