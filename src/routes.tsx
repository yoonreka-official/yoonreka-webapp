import { createBrowserRouter, Outlet } from 'react-router-dom'

import AppConfig from '~/configs/AppConfig.tsx'
import RootBoundary from '~/errors/RootBoundary'
import AuthGuard from '~/guards/AuthGuard'
import LayoutDefault from '~/layouts/LayoutDefault.tsx'
import GradesPage from '~/pages/grades'
import ExamResultPage from '~/pages/grades/exams'
import LecturesPage from '~/pages/lectures'
import LessonVideoPage from '~/pages/lectures/videos'
import LoginPage from '~/pages/login'
import MorePage from '~/pages/more'
import QuestionsPage from '~/pages/questions'
import SchedulesPage from '~/pages/schedules'
import WrongAnswersPage from '~/pages/wrong-answers'

export const router = createBrowserRouter([
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
            path: 'lectures',
            element: <LecturesPage />,
          },
          {
            path: 'lectures/videos/:videoId',
            element: <LessonVideoPage />,
          },
          {
            path: 'grades',
            element: <GradesPage />,
          },
          {
            path: 'grades/exams',
            element: <ExamResultPage />,
          },
          {
            path: 'grades/exams/:examId',
            element: <ExamResultPage />,
          },
          {
            path: 'wrong-answers',
            element: <WrongAnswersPage />,
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
])
