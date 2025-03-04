import { Outlet } from "react-router-dom";
import NavBar from "../components/Teacher/NavBar";
import SideBar from "../components/Teacher/SideBar";

const Teacher = () => {
  return (
    <div className="flex flex-row">
      {/* <ChooseSchool /> */}
      {/* <CreatePassword /> */}
      <SideBar />
      <div className="flex flex-col w-full border-l border-gray-400">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Teacher;
