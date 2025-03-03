import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { upsertUserDevice } from '~/api/fcm.api.ts';

import type { DeviceType } from '~/api/fcm.api.ts';
import type { Nullable } from '~/types/utils/nullable.type.ts';

function useFcmToken() {
  const [params] = useSearchParams();

  const fcmToken = params.get('fcm_token');

  const deviceType = params.get('device_type')?.toUpperCase() as
    | DeviceType
    | undefined;

  const { userAgent } = navigator;

  const handleUpsertFcmToken = () => {
    if (fcmToken && deviceType) {
      return upsertUserDevice({
        token: fcmToken,
        type: deviceType,
        userAgent,
      });
    }
  };

  const getFcmTokenData = () => {
    return {
      fcmToken: window.localStorage.getItem('fcmToken'),
      deviceType: window.localStorage.getItem(
        'deviceType',
      ) as Nullable<DeviceType>,
      userAgent,
    };
  };

  useEffect(() => {
    if (fcmToken) window.localStorage.setItem('fcmToken', fcmToken);
    if (deviceType) window.localStorage.setItem('deviceType', deviceType);
  }, [fcmToken, deviceType, userAgent]);

  return { getFcmTokenData, handleUpsertFcmToken };
}

export default useFcmToken;
