import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import { BasicModal } from '../../common/modal/Basic-modal'
import style from './portfolio.module.scss'
import { IconButton, List, ListItem } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { removeCurrency } from './portfolio-slice'

export const Portfolio = () => {

	const dispatch = useAppDispatch()

	const profileCurr = useAppSelector(state => state.portfolio.portfolioData.currencies)
	const totalPrice = useAppSelector(state => state.portfolio.portfolioData.totalPrice)
	const cuttedTotalPrice = totalPrice.toFixed(4)

	const [open, setOpen] = useState(false)

	const handleClose = () => setOpen(false)

	const handleOpen = () => setOpen(true)

	const onRemoveCurrency = useCallback( (id: string, price: string) => {
		 dispatch(removeCurrency({ id, price }))
		localStorage.setItem('storedCurrencies', JSON.stringify(profileCurr))

	},[dispatch])

	useEffect(() => {
		if (profileCurr.length !== 0)
		localStorage.setItem('storedCurrencies', JSON.stringify(profileCurr));

	}, [profileCurr])


	return (
		<>
			<BusinessCenterIcon fontSize={'large'} className={style.icon}
													onClick={handleOpen} />
			<BasicModal open={open} handleClose={handleClose} modalName={'Currency portfolio'}>
				<List>
					{profileCurr.map(curr => {
						const price = Number(curr.priceUsd).toFixed(4)
						return <ListItem className={style.listItem} key={curr.id}>
							<p>{curr.name}</p>
							<p>{price} USD</p>
							<IconButton aria-label='delete'
													className={style.icon}
													onClick={() => onRemoveCurrency(curr.id, curr.priceUsd)}>
								<DeleteIcon />
							</IconButton>
						</ListItem>
					})}
				</List>
				<div>
					<p>Total price: {cuttedTotalPrice}</p>
				</div>
			</BasicModal>
		</>
	)
}