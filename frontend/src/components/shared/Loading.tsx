import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        <p className="text-base text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
