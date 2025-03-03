import { useAppDispatch, useAppSelector } from '~/stores';
import { fetchNotifications } from '~/stores/NotificationSlice.ts';

import type { NotificationParams } from '~/types/notification.type.ts';

const useNotifications = () => {
  const state = useAppSelector(state => state.notification);

  const dispatch = useAppDispatch();

  const fetchData = async (params?: NotificationParams) => {
    try {
      await dispatch(fetchNotifications(params));
    } catch (e) {
      console.error(e);
    }
  };

  return { state, fetchData };
};

export default useNotifications;
