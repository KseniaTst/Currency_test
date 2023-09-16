import { ChangeEvent, useState } from 'react'

import { CustomButton } from '../../../common/components/Button/Button'
import { TextField } from '../../../common/components/TextField/TextField'
import { BasicModal } from '../../../common/modal/BasicModal'

import { CurrencyType } from '../../../services/headerApi'

import style from './addCurrencyModal.module.scss'

type PropsType = {
	addCurrToProfile: (amount: number, currency: CurrencyType) => void
	currency: CurrencyType
}

export const AddCurrencyModal = (props: PropsType) => {
	const { addCurrToProfile, currency } = props

	const [open, setOpen] = useState(false)
	const [amount, setAmount] = useState('')

	const handleClose = () => setOpen(false)

	const handleOpen = () => setOpen(true)

	const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
		setAmount(event.currentTarget.value)
	}

	const handleClickAdd = () => {
		const number = parseFloat(amount)
		number && addCurrToProfile(number, currency)
		setOpen(false)
	}
	return (
		<>
			<CustomButton text={'Add'} onClick={handleOpen} />
			<BasicModal
				open={open}
				handleClose={handleClose}
				modalName={'Add'}
				currencyName={currency.name}
			>
				<div className={style.textContainer}>
					<TextField
						value={amount}
						onChange={handleChangeAmount}
						label={'Amount'}
					/>
				</div>
				<div className={style.buttonBlock}>
					<CustomButton text={'Close'} onClick={handleClose} />
					<CustomButton text={'Add'} onClick={handleClickAdd} />
				</div>
			</BasicModal>
		</>
	)
}
