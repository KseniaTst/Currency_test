import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'

import { getCurrenciesThunk } from '../../../slices/mainSlice'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'

import style from './pagination.module.scss'

export const TablePagination = () => {
	const [page, setPage] = useState(1)

	let dispatch = useAppDispatch()
	const handleChange = (selectedItem: { selected: number }) => {
		setPage(selectedItem.selected)
		dispatch(getCurrenciesThunk(selectedItem.selected))
	}

	return (
		<ReactPaginate
			className={style.paginate}
			breakLabel='...'
			nextLabel='>'
			onPageChange={handleChange}
			pageRangeDisplayed={15}
			pageCount={Math.ceil(2000 / 15)}
			previousLabel='<'
			renderOnZeroPageCount={null}
		/>
	)
}
