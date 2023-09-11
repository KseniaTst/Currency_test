import * as React from 'react'
import { ReactNode } from 'react'
import style from './basic-modal.module.scss'
import { CloseButton } from '../components/Button/Close-button/Close-button'

type PropsType = {
	children: ReactNode
	open: boolean
	handleClose: () => void
	modalName: string
	currencyName?: string
}

export const BasicModal = (props: PropsType) => {

	const { children, open, modalName, handleClose, currencyName } = props
	return !open ? null : (
		<div className={style.modalBlock}>
			<div className={style.modalContainer}>
				<div className={style.header}>
					<span>{modalName} {currencyName}</span>
					<CloseButton onClick={handleClose} />
				</div>
				<hr />
				{children}
			</div>
		</div>
	)
}
