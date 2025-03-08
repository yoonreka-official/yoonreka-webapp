import { createBrowserRouter, Outlet } from 'react-router-dom';

import AppConfig from '~/configs/AppConfig.tsx';
import RootBoundary from '~/errors/RootBoundary';
import AuthGuard from '~/guards/AuthGuard';
import LayoutDefault from '~/layouts/LayoutDefault.tsx';
import GradesPage from '~/pages/grades';
import LecturesPage from '~/pages/lectures';
import LoginPage from '~/pages/login';
import MorePage from '~/pages/more';
import QuestionsPage from '~/pages/questions';
import SchedulesPage from '~/pages/schedules';

// const LoginPage = lazy(() => import('~/pages/login'));
//
// const SchedulesPage = lazy(() => import('~/pages/schedules'));
// const LecturesPage = lazy(() => import('~/pages/lectures'));
// const GradesPage = lazy(() => import('~/pages/grades'));
// const QuestionsPage = lazy(() => import('~/pages/questions'));
// const MorePage = lazy(() => import('~/pages/more'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppConfig />,
    errorElement: <RootBoundary />,
    children: [
      {
        path: '/',
        element: (
          <AuthGuard>
            <LayoutDefault />
          </AuthGuard>
        ),
        children: [
          {
            path: '/',
            element: <SchedulesPage />,
          },
          {
            path: '/lectures',
            element: <LecturesPage />,
          },
          {
            path: 'grades',
            element: <GradesPage />,
          },
          {
            path: 'questions',
            element: <QuestionsPage />,
          },
          {
            path: 'more',
            element: <MorePage />,
          },
        ],
      },
      {
        path: 'auth',
        element: <Outlet />,
        errorElement: <RootBoundary />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
