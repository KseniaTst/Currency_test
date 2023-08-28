import { instance } from '../../common/config/api-config'

export const headerApi = {
	getPopularСurr() {
		return instance.get<ResponseGetCurrType>('', { params: {limit: 3} })
	},

}

export type ResponseGetCurrType = {
	data: CurrencyType[]
	timestamp: string
}

export type CurrencyType = {
	id: string,
	rank: string,
	symbol: string,
	name: string,
	supply: string,
	maxSupply: string,
	marketCapUsd: string,
	volumeUsd24Hr: string,
	priceUsd: string,
	changePercent24Hr: string,
	vwap24Hr: string,
	explorer: string
}