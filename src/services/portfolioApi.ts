import { ResponseGetCurrType } from './headerApi'

import { instance } from '../common/config/apiConfig'

export const portfolioApi = {
	getPortfolioCurr(curr: string[]) {
		const param = curr.join(',')
		return instance.get<ResponseGetCurrType>('', { params: { ids: param } })
	},
}
