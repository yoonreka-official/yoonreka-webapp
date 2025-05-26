import { useCallback, useEffect } from 'react'

import { useAppDispatch } from '~/stores'
import { toggleLoading as toggleLoadingAction } from '~/stores/LayoutSlice.ts'

const useLoading = (isLoading?: boolean) => {
  const dispatch = useAppDispatch()

  const toggleLoading = useCallback(
    (toggle: boolean) => {
      dispatch(toggleLoadingAction(toggle))
    },
    [dispatch],
  )

  useEffect(() => {
    if (typeof isLoading !== 'undefined') {
      if (isLoading) {
        toggleLoading(true)
      } else {
        setTimeout(() => {
          toggleLoading(false)
        }, 300)
      }
    }
  }, [isLoading, toggleLoading])

  return { toggleLoading }
}

export default useLoading
