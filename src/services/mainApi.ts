import { ResponseGetCurrType } from './headerApi'

import { instance } from '../common/config/apiConfig'

export const mainApi = {
	getCurrencies(offset?: number) {
		if (offset) offset = offset * 15
		return instance.get<ResponseGetCurrType>('', {
			params: { limit: 15, offset },
		})
	},
	getCurrency(id: string) {
		return instance.get<ResponseGetCurrType>(`/${id}`)
	},
	getCurrencyHistory(id: string) {
		return instance.get(`/${id}/history`, { params: { interval: 'd1' } })
	},
}

export type HistoryType = {
	priceUsd: string
	time: number
	date: string
}
