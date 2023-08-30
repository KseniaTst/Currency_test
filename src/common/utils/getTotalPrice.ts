export const getTotalPrice = (arr: any) => arr.reduce((sum: number, obg: any) => Number(obg.priceUsd) + sum, 0)
