import Trash from '../../../../assets/icons/trash.png'

import style from './deleteButton.module.scss'

type PropsType = {
	onClick: () => void
}

export const DeleteButton = (props: PropsType) => {
	const { onClick } = props

	const onButtonClick = () => {
		onClick()
	}

	return (
		<button className={style.delete} onClick={onButtonClick}>
			<img className={style.delete__icon} src={Trash} alt={'delete'} />
		</button>
	)
}
