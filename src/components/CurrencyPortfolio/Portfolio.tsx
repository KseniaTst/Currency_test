import { useCallback, useEffect, useState } from 'react'

import { removeCurrency } from '../../slices/portfolioSlice'

import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'

import { DeleteButton } from '../../common/components/Button/DeleteButton/DeleteButton'
import { BasicModal } from '../../common/modal/BasicModal'

import BusinessIcon from '../../assets/icons/pngegg.png'

import style from './portfolio.module.scss'

export const Portfolio = () => {
	const dispatch = useAppDispatch()

	const portfolioCurr = useAppSelector(
		state => state.portfolio.portfolioData.currencies
	)
	const totalPrice = useAppSelector(
		state => state.portfolio.portfolioData.totalPrice
	)
	const cuttedTotalPrice = totalPrice.toFixed(4)
	const currNames: string[] = portfolioCurr.map(curr => curr.id)

	const [open, setOpen] = useState(false)

	const handleClose = () => setOpen(false)

	const handleOpen = () => setOpen(true)

	const onRemoveCurrency = useCallback(
		(id: string, price: string) => {
			dispatch(removeCurrency({ id, price }))
			localStorage.setItem('storedCurrencies', JSON.stringify(currNames))
			localStorage.setItem('storedTotalPrice', JSON.stringify(totalPrice))
		},
		[dispatch]
	)

	useEffect(() => {
		if (portfolioCurr.length !== 0) {
			localStorage.setItem('storedCurrencies', JSON.stringify(currNames))
			localStorage.setItem('storedTotalPrice', JSON.stringify(totalPrice))
		}
	}, [portfolioCurr])

	return (
		<div className={style.portfolio}>
			<div className={style.portfolio__iconContainer} onClick={handleOpen}>
				<img className={style.portfolio__icon} src={BusinessIcon} alt={''} />
				<a className={style.portfolio__iconText}>portfolio</a>
			</div>
			<BasicModal
				open={open}
				handleClose={handleClose}
				modalName={'Currency portfolio'}
			>
				<ul>
					{portfolioCurr.map(curr => {
						const price = Number(curr.priceUsd).toFixed(4)
						return (
							<li className={style.portfolio__listItem} key={curr.id}>
								<p className={style.portfolio__listItemText}>{curr.name}</p>
								<p className={style.portfolio__listItemText}>{price} USD</p>
								<DeleteButton
									onClick={() => onRemoveCurrency(curr.id, curr.priceUsd)}
								/>
							</li>
						)
					})}
				</ul>
				<div>
					<p>Total price: {cuttedTotalPrice}</p>
				</div>
			</BasicModal>
		</div>
	)
}
