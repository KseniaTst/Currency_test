import { LineChart, CartesianGrid, Line, XAxis, YAxis } from 'recharts'
import { HistoryType } from '../../components/Main/main-api'
import { ConvertDate } from '../utils/convert-date'

type PropsType = {
	data: HistoryType[]
}

export const Chart = (props: PropsType) => {

	const { data } = props

	const date = data.map(el => ConvertDate(el.date))
	return (
		<LineChart width={600} height={300} data={data}>
			<Line type='monotone' dataKey='priceUsd' stroke='#8884d8' />
			<CartesianGrid stroke='#ccc' />
			<XAxis dataKey={() => date} />
			<YAxis dataKey={'priceUsd'} />
		</LineChart>
	)
}