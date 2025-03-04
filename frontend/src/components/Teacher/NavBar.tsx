import { FaPlus, FaRegBell } from "react-icons/fa6";
import { TbMessageQuestion } from "react-icons/tb";
import { Drawer, Menu, Popover } from "antd";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import defaultImg from "/src/assets/default-ava.png";
import { sideBarItems } from "../../constants/constants";
import { clearUser } from "../../store/userReducer";
import { useState } from "react";
import { RootState } from "../../store/store";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    setPopoverVisible(false);
  };

  return (
    <div className="flex flex-row justify-end sticky z-10 top-0 bg-white items-center w-full py-2 px-4 gap-2 border-b border-gray-400">
      <IoMdMenu className="mr-auto text-2xl cursor-pointer md:hidden" />
      <Drawer
        title={
          <img
            src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
            className="object-cover w-2/3"
            alt="Logo"
          />
        }
        placement={"left"}
        closable={true}
        width={200}
      >
        <button className="bg-[#fe5f5c] w-11/12 ml-2 my-2 flex flex-row items-center justify-center gap-1 text-white rounded-md py-2 hover:bg-[#f8a09f]">
          <FaPlus className="text-xs" />
          <p>Create</p>
        </button>
        <Menu
          mode="inline"
          theme="light"
          items={sideBarItems}
          className="text-sm"
        />
      </Drawer>
      <FaRegBell className="border border-gray-400 h-auto w-9 p-2 rounded-md hover:bg-gray-200 cursor-pointer transition-all ease-in duration-100" />
      <div className="border border-gray-400 whitespace-nowrap font-medium p-2 cursor-pointer transition-all ease-in duration-100 rounded-md hover:bg-gray-200">
        Enter code
      </div>
      <div className="flex flex-row max-md:hidden items-center justify-center p-2 border border-gray-400 rounded-md font-medium gap-1 hover:bg-gray-200 transition-all ease-in duration-100 cursor-pointer">
        <TbMessageQuestion className="w-full" />
        <p className="whitespace-nowrap">Get help</p>
      </div>
      <Popover
        placement="bottomRight"
        title={"Shim"}
        trigger="click"
        open={popoverVisible}
        onOpenChange={setPopoverVisible}
        content={
          <div className="flex flex-col gap-2">
            <Link
              to={`/teacher/profile/${user.id}`}
              className="flex flex-row items-center text-gray-800 gap-2 hover:text-[#fe5f5c]"
            >
              <FaRegUserCircle />
              <p>View profile</p>
            </Link>
            <Link
              to={"/teacher/settings"}
              className="flex flex-row items-center text-gray-800 gap-2 hover:text-[#fe5f5c]"
            >
              <LuSettings />
              <p>Settings</p>
            </Link>
            <Link
              to={"/"}
              onClick={handleLogout}
              className="flex flex-row items-center text-gray-800 gap-2 hover:text-[#fe5f5c]"
            >
              <MdLogout />
              <p>Logout</p>
            </Link>
          </div>
        }
      >
        <img
          src={defaultImg}
          alt="avatar"
          className="w-auto h-11 border-2 aspect-square object-cover border-gray-100 hover:border-gray-400 transition-all duration-100 ease-in-out cursor-pointer rounded-full "
        />
      </Popover>
    </div>
  );
};

export default NavBar;
