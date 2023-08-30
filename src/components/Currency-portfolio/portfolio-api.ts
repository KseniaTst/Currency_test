import { instance } from '../../common/config/api-config'
import { ResponseGetCurrType } from '../Header/header-api'

export const portfolioApi = {
	getPortfolioCurr(curr: string[]) {
		const param = curr.join(',')
		return instance.get<ResponseGetCurrType>('', { params: { ids: param } })
	},
}