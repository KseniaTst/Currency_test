import BusinessIcon from '../../assets/icons/pngegg.png'
import { BasicModal } from '../../common/modal/BasicModal'
import style from './portfolio.module.scss'
import { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { removeCurrency } from './portfolioSlice'
import { DeleteButton } from '../../common/components/Button/DeleteButton/DeleteButton'

export const Portfolio = () => {

	const dispatch = useAppDispatch()

	const portfolioCurr = useAppSelector(state => state.portfolio.portfolioData.currencies)
	const totalPrice = useAppSelector(state => state.portfolio.portfolioData.totalPrice)
	const cuttedTotalPrice = totalPrice.toFixed(4)
	const currNames: string[] = portfolioCurr.map(curr => curr.id)


	const [open, setOpen] = useState(false)

	const handleClose = () => setOpen(false)

	const handleOpen = () => setOpen(true)

	const onRemoveCurrency = useCallback((id: string, price: string) => {
		dispatch(removeCurrency({ id, price }))
		localStorage.setItem('storedCurrencies', JSON.stringify(currNames))
		localStorage.setItem('storedTotalPrice', JSON.stringify(totalPrice))

	}, [dispatch])

	useEffect(() => {
		if (portfolioCurr.length !== 0) {
			localStorage.setItem('storedCurrencies', JSON.stringify(currNames))
			localStorage.setItem('storedTotalPrice', JSON.stringify(totalPrice))
		}

	}, [portfolioCurr])


	return (
		<>
			<div className={style.iconContainer} onClick={handleOpen}>
				<img src={BusinessIcon} alt={''}/>
				<a>portfolio</a>
			</div>
			<BasicModal open={open} handleClose={handleClose} modalName={'Currency portfolio'}>
				<ul>
					{portfolioCurr.map(curr => {
						const price = Number(curr.priceUsd).toFixed(4)
						return <li className={style.listItem} key={curr.id}>
							<p>{curr.name}</p>
							<p>{price} USD</p>
							<DeleteButton onClick={() => onRemoveCurrency(curr.id, curr.priceUsd)} />
						</li>
					})}
				</ul>
				<div>
					<p>Total price: {cuttedTotalPrice}</p>
				</div>
			</BasicModal>
		</>
	)
}