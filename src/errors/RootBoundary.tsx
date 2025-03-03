import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

interface ErrorTemplateProps {
  message?: string;
  status?: number | string;
}

export function ErrorTemplate({ status, message }: ErrorTemplateProps) {
  return (
    <div className="flex flex-col gap-4 h-screen justify-center items-center bg-gray-100">
      <h1 className="text-8xl font-bold">{status || 'Oooooops!'}</h1>
      <p className="text-2xl text-gray-500">{message}</p>
    </div>
  );
}

function RootBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <ErrorTemplate message="Page Not Found" status={error.status} />;
    }

    if (error.status === 401) {
      return (
        <ErrorTemplate message="You aren't authorized" status={error.status} />
      );
    }

    return <ErrorTemplate message={error.data.message} status={error.status} />;
  }

  return (
    <ErrorTemplate
      message={(error as Error).message}
      status={(error as Error).name}
    />
  );
}

export default RootBoundary;
