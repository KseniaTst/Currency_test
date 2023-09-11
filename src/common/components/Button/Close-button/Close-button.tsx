import style from './close-button.module.scss'

type PropsType={
	onClick: () => void

}

export const CloseButton=(props:PropsType)=>{

	const {onClick} = props

	const onButtonClick = () => {
		onClick()
	}

	return(
		<button className={style.close} onClick={onButtonClick}/>
	)
}