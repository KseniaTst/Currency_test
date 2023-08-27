import { Button, TextField } from '@mui/material'
import { BasicModal } from '../../../common/modal/Basic-modal'
import { ChangeEvent, useState } from 'react'
import style from './add-currency-modal.module.scss'

export const AddCurrencyModal = () => {

	const [open, setOpen] = useState(false)
	const [amount, setAmount] = useState(0)


	const handleClose = () => setOpen(false)

	const handleOpen = () => setOpen(true)

	const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
		setAmount(event.currentTarget.valueAsNumber)
	}

	const handleClickAdd = () => {
		setOpen(false)
	}

	return (
		<>
			<Button variant={'outlined'} onClick={handleOpen}>Add</Button>
			<BasicModal open={open} handleClose={handleClose} modalName={'Add currency'}>
				<div className={style.textContainer}>
					<TextField
						type={'number'}
						variant={'standard'}
						value={amount}
						onChange={handleChangeAmount}
						label={'amount'}
						fullWidth
						placeholder={'0.1'}
						autoFocus
					/>
				</div>
				<div className={style.buttonBlock}>
					<Button variant={'contained'} onClick={handleClose}>
						Close
					</Button>
					<Button variant={'contained'} color={'success'} onClick={handleClickAdd}>
						Add
					</Button>
				</div>
			</BasicModal>
		</>
	)
}