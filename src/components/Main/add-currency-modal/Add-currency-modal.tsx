import { TextField } from '../../../common/components/TextField/TextField'
import { BasicModal } from '../../../common/modal/Basic-modal'
import { ChangeEvent, useState } from 'react'
import style from './add-currency-modal.module.scss'
import { CurrencyType } from '../../Header/header-api'
import { CustomButton } from '../../../common/components/Button/Button'

type PropsType = {
	addCurrToProfile: (amount: number, currency: CurrencyType) => void
	currency: CurrencyType
}

export const AddCurrencyModal = (props: PropsType) => {

	const { addCurrToProfile, currency } = props

	const [open, setOpen] = useState(false)
	const [amount, setAmount] = useState(0)


	const handleClose = () => setOpen(false)

	const handleOpen = () => setOpen(true)

	const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
		setAmount(event.currentTarget.valueAsNumber)
	}

	const handleClickAdd = () => {
		addCurrToProfile(amount, currency)
		setOpen(false)
	}
	return (
		<>
			<CustomButton text={'Add'} onClick={handleOpen} />
			<BasicModal open={open} handleClose={handleClose} modalName={'Add'} currencyName={currency.name}>
				<div className={style.textContainer}>
					<TextField value={amount} onChange={handleChangeAmount} label={'Amount'} />
					{/*<TextField*/}
					{/*	type={'number'}*/}
					{/*	variant={'standard'}*/}
					{/*	value={amount}*/}
					{/*	onChange={handleChangeAmount}*/}
					{/*	label={'amount'}*/}
					{/*	fullWidth*/}
					{/*	placeholder={'0.1'}*/}
					{/*	autoFocus*/}
					{/*/>*/}
				</div>
				<div className={style.buttonBlock}>
					<CustomButton text={'Close'} onClick={handleClose} />
					<CustomButton text={'Add'} onClick={handleClickAdd} />
				</div>
			</BasicModal>
		</>
	)
}