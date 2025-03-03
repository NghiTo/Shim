import { Result, Button } from "antd";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorFallback = () => {
  const error = useRouteError();
  const errorMessage = isRouteErrorResponse(error)
    ? error.statusText
    : (error as Error).message || "An unknown error occurred";
  return (
    <Result
      status="500"
      title="Oops! Something went wrong."
      subTitle={errorMessage}
      extra={<Button type="primary">Back to home</Button>}
    />
  );
};

export default ErrorFallback;
