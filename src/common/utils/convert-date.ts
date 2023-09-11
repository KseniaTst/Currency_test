export const ConvertDate = (date: string) => {
	const newDate = new Date(date)
	const formattedDate = `${newDate.getDate()}/${newDate.getMonth() + 1}`
	return formattedDate
}
