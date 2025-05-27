import { useAppDispatch, useAppSelector } from '~/stores'
import {
  fetchNotifications,
  readNotifications,
  setType,
} from '~/stores/NotificationSlice.ts'

import type {
  NotificationParams,
  NotificationType,
} from '~/types/notification.type.ts'

export default function useNotifications() {
  const state = useAppSelector((state) => state.notification)

  const dispatch = useAppDispatch()

  const fetchData = async (params?: NotificationParams) => {
    try {
      await dispatch(fetchNotifications(params))
    } catch (e) {
      console.error(e)
    }
  }

  const setReadId = (id: string) => {
    const readIds = JSON.parse(window.localStorage.getItem('readIds') || '[]')
    if (!readIds.includes(id)) {
      readIds.push(id)
    }

    window.localStorage.setItem('readIds', JSON.stringify(readIds))
  }

  const handleMarkAsRead = () => {
    dispatch(readNotifications())
  }

  const handleChangeType = (activeKey: NotificationType | 'ALL') => {
    dispatch(setType(activeKey))
  }

  return { state, fetchData, setReadId, handleChangeType, handleMarkAsRead }
}
