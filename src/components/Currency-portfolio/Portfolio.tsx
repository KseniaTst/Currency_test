import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import { BasicModal } from '../../common/modal/Basic-modal'
import style from './portfolio.module.scss'
import { List, ListItem } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'

export const Portfolio = () => {

	const [open, setOpen] = useState(false)

	const handleClose = () => setOpen(false)

	const handleOpen = () => setOpen(true)

	return (
		<>
			<BusinessCenterIcon fontSize={'large'} className={style.icon}
													onClick={handleOpen} />
			<BasicModal open={open} handleClose={handleClose} modalName={'Currency portfolio'}>
				<List >
					<ListItem className={style.listItem}>
						<p>Bitcoin</p>
						<p>20000 $</p>
						<DeleteIcon />
					</ListItem>
				</List>
			</BasicModal>
		</>
	)
}