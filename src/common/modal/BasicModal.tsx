import * as React from 'react'
import { ReactNode } from 'react'

import { CloseButton } from '../components/Button/CloseButton/CloseButton'

import style from './basicModal.module.scss'

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
		<div className={style.modal}>
			<div className={style.modal__container}>
				<div className={style.modal__header}>
					<span>
						{modalName} {currencyName}
					</span>
					<CloseButton onClick={handleClose} />
				</div>
				<hr />
				{children}
			</div>
		</div>
	)
}
