import { Outlet } from "react-router-dom";
import NavBar from "../components/Teacher/NavBar";
import SideBar from "../components/Teacher/SideBar";
import ChooseSchool from "../components/Teacher/ChooseSchool";
import CreatePassword from "../components/Teacher/CreatePassword";
import { useState } from "react";

const Teacher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex flex-row w-screen">
      <ChooseSchool />
      <CreatePassword />
      <SideBar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="flex flex-col w-full border-l border-gray-400">
        <NavBar setIsModalOpen={setIsModalOpen} />
        <Outlet />
      </div>
    </div>
  );
};

export default Teacher;
