import { useSelector } from 'react-redux'
import { TypedUseSelectorHook } from 'react-redux/es/types'

import { RootStateType } from '../../store/store'

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
