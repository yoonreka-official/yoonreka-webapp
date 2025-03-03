import { css } from '@emotion/react';

import LoginForm from '~/pages/login/LoginForm.tsx';
import LoginHeader from '~/pages/login/LoginHeader.tsx';

function LoginPage() {
  return (
    <div css={styles.container}>
      <LoginHeader />
      <LoginForm />
    </div>
  );
}

const styles = {
  container: css`
    padding: 0 20px 50px;
    height: 100%;
    overflow-y: auto;
  `,
};

export default LoginPage;
