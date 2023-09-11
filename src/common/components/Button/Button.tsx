import style from './button.module.scss'

type PropsType={
	text:string
	onClick: () => void

}

export const CustomButton=(props:PropsType)=>{

	const {text, onClick} = props

	const onButtonClick = () => {
		onClick()
	}

	return(
		<button className={style.button} onClick={onButtonClick}>{text}</button>
	)
}