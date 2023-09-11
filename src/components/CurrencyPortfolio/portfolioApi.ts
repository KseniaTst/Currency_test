import { instance } from '../../common/config/apiConfig'
import { ResponseGetCurrType } from '../Header/headerApi'

export const portfolioApi = {
	getPortfolioCurr(curr: string[]) {
		const param = curr.join(',')
		return instance.get<ResponseGetCurrType>('', { params: { ids: param } })
	},
}