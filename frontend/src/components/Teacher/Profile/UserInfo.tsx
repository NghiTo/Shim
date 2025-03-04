import { FaUserEdit } from "react-icons/fa";
import { FaBook, FaCamera, FaSchool } from "react-icons/fa6";

import defaultImg from "/src/assets/default-ava.png";
import { useRef } from "react";

const UserInfo = () => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  return (
    <div className="bg-gray-100 p-8 max-md:py-8 max-md:px-0 max-md:min-h-screen h-full">
      <div className="rounded-xl bg-white p-8 max-md:p-4 flex flex-row gap-8 max-md:gap-2">
        <div
          onClick={handleImageClick}
          className={`w-1/6 cursor-pointer group relative max-md:hidden`}
        >
          <img
            src={defaultImg}
            alt="Avatar"
            className="w-full h-auto aspect-square rounded-full object-cover"
          />
          <>
            <div className="absolute rounded-full inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            <FaCamera className="absolute hidden group-hover:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white" />
            <input
              type="file"
              ref={inputFileRef}
              // onChange={handleImageChange}
              className="absolute opacity-0 w-0 h-0"
            />
          </>
        </div>
        <div className="flex flex-col max-md:gap-4 w-full">
          <div className="flex flex-row gap-4 items-start">
            <img
              //   src={(res?.avatarUrl as string) || defaultImg}
              alt="avatar"
              className="w-1/6 h-auto aspect-square rounded-full object-cover md:hidden"
            />
            <div className="flex flex-row gap-2 items-center max-md:flex-col max-md:items-start">
              <h1 className="text-lg max-md:text-base font-semibold text-[#424242]">
                {/* {res?.title + ". " + res?.firstName + " " + res?.lastName} */}
              </h1>
              <p className="uppercase text-sm max-md:text-xs py-1 px-2 text-white bg-[#fe5f5c] rounded-full whitespace-nowrap text-center">
                {/* {res?.role} */}
              </p>
            </div>
            <button
              //   onClick={() => setIsModalOpen(true)}
              className="ml-auto font-medium border border-gray-300 py-1 rounded-md flex flex-row gap-1 items-center px-2 hover:bg-gray-200 transition-all ease-in-out duration-100"
            >
              <FaUserEdit />
              <p className="max-md:hidden">Edit profile</p>
            </button>
            {/* <EditProfile
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              data={res}
            /> */}
          </div>
          <div className="mt-auto flex flex-col gap-2 max-md:text-sm">
            <>
              <div className="flex flex-row items-center gap-1">
                <FaBook className="text-[#fe5f5c]" />
                {/* <p>{res?.subject}</p> */}
              </div>

              <div className="flex flex-row gap-2 items-center">
                <FaSchool className="text-[#fe5f5c]" />
                <p>
                  {/* {res?.school.name +
                      ", " +
                      res?.school.city +
                      ", " +
                      res?.school.country} */}
                </p>
                <p className="text-sm py-1 px-2 text-white bg-[#00a06a] rounded-md whitespace-nowrap text-center">
                  {/* {res?.grade} */}
                </p>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
