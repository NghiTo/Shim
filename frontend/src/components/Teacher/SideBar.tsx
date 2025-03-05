import { Menu } from "antd";
import { FaPlus } from "react-icons/fa6";
import { routeMap, sideBarItems } from "../../constants/constants";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = Object.keys(routeMap).find((key) => routeMap[key] === location.pathname);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (routeMap[key]) {
      navigate(routeMap[key]);
    }
  };

  return (
    <div className="sticky top-0 w-1/5 py-2 flex flex-col gap-2 h-screen max-md:hidden">
      <img
        src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
        alt="Logo"
        className="object-cover w-2/5 flex mx-auto mb-3"
      />
      <button className="bg-[#fe5f5c] mx-2 flex flex-row items-center justify-center gap-1 text-white rounded-md py-2 hover:bg-[#fc8785] transition-all ease-in-out">
        <FaPlus className="text-xs" />
        <p>Create</p>
      </button>
      <Menu
        mode="inline"
        theme="light"
        items={sideBarItems}
        className="text-sm"
        onClick={handleMenuClick}
        selectedKeys={selectedKey ? [selectedKey] : []}
      />
    </div>
  );
};

export default SideBar;
