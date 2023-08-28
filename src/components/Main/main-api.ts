import { instance } from '../../common/config/api-config'
import { ResponseGetCurrType } from '../Header/header-api'

export const mainApi = {
	getCurrencies() {
		return instance.get<ResponseGetCurrType>('', { params: {limit: 15} })
	},

}