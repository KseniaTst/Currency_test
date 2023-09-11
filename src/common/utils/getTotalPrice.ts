import { CurrencyType } from '../../components/Header/headerApi'

export const getTotalPrice = (arr: CurrencyType[]) => arr.reduce((sum: number, obg: CurrencyType) => Number(obg.priceUsd) + sum, 0)
