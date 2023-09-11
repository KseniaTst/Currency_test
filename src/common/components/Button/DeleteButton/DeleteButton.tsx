import style from './deleteButton.module.scss'
import Trash from '../../../../assets/icons/trash.png'

type PropsType={
	onClick: () => void

}

export const DeleteButton=(props:PropsType)=>{

	const {onClick} = props

	const onButtonClick = () => {
		onClick()
	}

	return(
		<button className={style.delete} onClick={onButtonClick}>
			<img src={Trash} alt={'delete'}/>
		</button>
	)
}