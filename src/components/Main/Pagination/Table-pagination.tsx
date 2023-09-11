import React, { useState } from 'react'
import Stack from '@mui/material/Stack'
import { useAppDispatch } from '../../../common/hooks/use-app-dispatch'
import { getCurrenciesThunk } from '../main-slice'
import { Pagination } from '@mui/material'
import style from './pagination.module.scss'

export const TablePagination = () => {
  const [page, setPage] = useState(1)

  let dispatch = useAppDispatch()
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
      dispatch(getCurrenciesThunk(value-1))

  }

  return (
    <Stack spacing={2} className={style.container}>
      <Pagination count={Math.ceil(2000/15)} page={page} onChange={handleChange} />
    </Stack>
  )
}
