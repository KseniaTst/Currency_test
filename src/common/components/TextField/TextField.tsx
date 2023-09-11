import { ChangeEvent } from 'react'
import style from './textField.module.scss'

type PropsType = {
	value: number
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	label: string
}

export const TextField = (props: PropsType) => {

	const { value, onChange, label } = props

	return (
		<div className={style.textField}>
			<label className={style.textField__label} htmlFor="{'input'}">{label}</label>
			<input className={style.textField__input}
						 type='number'
						 name={'input'}
						 placeholder={label}
						 onChange={onChange}
						 value={value}
						 autoFocus />
		</div>
	)
}