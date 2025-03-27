import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="warning"
      title="There are some problems with your operation."
      extra={
        <Button onClick={() => navigate(-1)} type="primary" key="console">
          Go back
        </Button>
      }
    />
  );
};

export default ErrorPage;
