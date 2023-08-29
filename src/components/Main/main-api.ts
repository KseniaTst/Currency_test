import { instance } from '../../common/config/api-config'
import { ResponseGetCurrType } from '../Header/header-api'

export const mainApi = {
	getCurrencies() {
		return instance.get<ResponseGetCurrType>('', { params: { limit: 15 } })
	},
	getCurrency(id: string) {
		return instance.get<ResponseGetCurrType>(`/${id}`)
	},
	getCurrencyHistory(id: string) {
		return instance.get(`/${id}/history`, { params: { interval: 'd1' } })
	},
}

export type HistoryType = {
	priceUsd: string,
	time: number,
	date: string
}