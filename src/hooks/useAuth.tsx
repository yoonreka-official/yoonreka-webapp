import { useNavigate } from 'react-router-dom';

import { signIn } from '~/api/auth.api.ts';
import useFcmToken from '~/configs/useFcmToken.tsx';
import useLoading from '~/hooks/useLoading.ts';
import { useAppDispatch, useAppSelector } from '~/stores';
import { setAuthUser } from '~/stores/AuthSlice.ts';
import dialog from '~/utils/dialog.util.tsx';

import type { LoginInput } from '~/types/auth.type.ts';

const useAuth = () => {
  const state = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { toggleLoading } = useLoading();

  const { getFcmTokenData } = useFcmToken();

  const fetchMe = () => {
    dispatch(setAuthUser({}));
  };

  const handleLogin = async (body: LoginInput) => {
    toggleLoading(true);

    const { fcmToken, deviceType, userAgent } = getFcmTokenData();

    try {
      await signIn({
        ...body,
        token: fcmToken || undefined,
        deviceType: deviceType || undefined,
        userAgent,
      });

      toggleLoading(false);
      navigate('/', { replace: true });
    } catch (e) {
      await dialog.message({
        title: '핸드폰 번호/비밀번호 오류',
        content: (
          <>
            핸드폰 번호 또는 비밀번호가 잘못 되었습니다.
            <br />
            핸드폰 번호와 비밀번호를 정확히 입력해 주세요.
          </>
        ),
      });

      toggleLoading(false);
    }
  };

  return { state, fetchMe, handleLogin };
};

export default useAuth;
