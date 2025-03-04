import { Outlet } from "react-router-dom";
import NavBar from "../components/Teacher/NavBar";
// import NavBar from "../../components/Teacher/NavBar";
// import SideBar from "../../components/Teacher/SideBar/SideBar";
// import { useEffect, useState } from "react";
// import ChooseSchool from "../../components/Teacher/ChooseSchool";
// import CreatePassword from "../../components/Teacher/CreatePassword";

const Teacher = () => {
  // const [selectedKeys, setSelectedKeys] = useState<string[]>(() => {
  //   const savedKeys = localStorage.getItem("selectedKeys");
  //   return savedKeys ? JSON.parse(savedKeys) : ["1"];
  // });

  // useEffect(() => {
  //   localStorage.setItem("selectedKeys", JSON.stringify(selectedKeys));
  // }, [selectedKeys]);

  return (
    <div className="flex flex-row">
      {/* <ChooseSchool /> */}
      {/* <CreatePassword /> */}
      {/* <SideBar selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} /> */}
      <div className="flex flex-col w-full border-l border-gray-400">
        <NavBar
        //  selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Teacher;
