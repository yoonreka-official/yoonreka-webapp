import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

import ErrorTemplate from '~/errors/ErrorTemplate.tsx'

export default function RootBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <ErrorTemplate message="Page Not Found" status={error.status} />
    }

    if (error.status === 401) {
      return (
        <ErrorTemplate message="You aren't authorized" status={error.status} />
      )
    }

    return <ErrorTemplate message={error.data.message} status={error.status} />
  }

  return (
    <ErrorTemplate
      message={(error as Error).message}
      status={(error as Error).name}
    />
  )
}
