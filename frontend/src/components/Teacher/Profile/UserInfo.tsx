import { FaUserEdit } from "react-icons/fa";
import { FaBook, FaCamera, FaSchool } from "react-icons/fa6";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import defaultImg from "/src/assets/default-ava.png";
import { RootState } from "../../../store/store";
import { getUserById, updateUser } from "../../../apis/user.api";
import { Profile } from "../../../types/user.type";
import { message, Skeleton, Spin } from "antd";
import EditProfile from "./EditProfile";
import { setUser } from "../../../store/userReducer";

const UserInfo = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery<Profile>({
    queryKey: ["profile", user.id],
    queryFn: () => getUserById(user.id),
  });

  const handleImageClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => updateUser(user.id, data),
    onSuccess: (res) => {
      message.success("Update avatar successfully");
      queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
      queryClient.invalidateQueries({ queryKey: ["google"] });
      dispatch(setUser({ ...user, avatarUrl: res.data.avatarUrl }));
      setIsModalOpen(false);
    },
  });

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatarUrl", file);
    mutate(formData);
  };

  return (
    <div className="bg-gray-100 p-8 max-md:py-8 max-md:px-0 max-md:min-h-screen h-full w-full">
      <div className="rounded-xl bg-white p-8 max-md:p-4 flex flex-row gap-8 max-md:gap-2">
        <div
          onClick={handleImageClick}
          className={`w-1/6 cursor-pointer group relative max-md:hidden`}
        >
          {isLoading ? (
            <Skeleton.Avatar
              active
              size="large"
              shape="circle"
              style={{ width: 140, height: 140 }}
            />
          ) : (
            <img
              src={(data?.avatarUrl as string) || defaultImg}
              alt="Avatar"
              className="w-full h-auto aspect-square rounded-full object-cover"
            />
          )}
          {isPending && (
            <div className="rounded-full absolute inset-0 flex items-center justify-center bg-black opacity-40">
              <Spin />
            </div>
          )}
          <>
            <div className="absolute rounded-full inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            <FaCamera className="absolute hidden group-hover:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white" />
            <input
              type="file"
              ref={inputFileRef}
              className="absolute opacity-0 w-0 h-0"
              onChange={uploadImage}
            />
          </>
        </div>
        <div className="flex flex-col max-md:gap-4 w-full">
          <div className="flex flex-row gap-4 items-start">
            <img
              src={(data?.avatarUrl as string) || defaultImg}
              alt="avatar"
              className="w-1/6 h-auto aspect-square rounded-full object-cover md:hidden"
            />
            {isLoading ? (
              <Skeleton active paragraph={{ rows: 0 }} />
            ) : (
              <div className="flex flex-row gap-2 items-center max-md:flex-col max-md:items-start">
                <h1 className="text-lg max-md:text-base font-semibold text-[#424242]">
                  {`${data?.title ? data?.title + "." : ""} ${
                    data?.firstName
                  } ${data?.lastName}`}
                </h1>
                <p className="uppercase text-sm max-md:text-xs py-1 px-2 text-white bg-[#fe5f5c] rounded-full whitespace-nowrap text-center">
                  {data?.role}
                </p>
              </div>
            )}
            {isLoading ? (
              <Skeleton.Button
                active
                style={{ width: 120 }}
                className="ml-auto"
              />
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="ml-auto font-medium border cursor-pointer border-gray-300 py-1 rounded-md flex flex-row gap-1 items-center px-2 hover:bg-gray-200 transition-all ease-in-out duration-100"
              >
                <FaUserEdit />
                <p className="max-md:hidden">Edit profile</p>
              </button>
            )}

            <EditProfile
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              data={data}
            />
          </div>
          <div className="mt-auto flex flex-col gap-2 max-md:text-sm">
            {isLoading ? (
              <Skeleton active paragraph={{ rows: 1 }} />
            ) : (
              <>
                <div className="flex flex-row items-center gap-1">
                  <FaBook className="text-[#fe5f5c]" />
                  <p>{data?.subject || "?? Subject"}</p>
                </div>

                <div className="flex flex-row gap-2 items-center">
                  <FaSchool className="text-[#fe5f5c]" />
                  <p>
                    {data?.school.name +
                      ", " +
                      data?.school.city +
                      ", " +
                      data?.school.country}
                  </p>
                  <p className="text-sm py-1 px-2 text-white bg-[#00a06a] rounded-md whitespace-nowrap text-center">
                    {data?.grade || "?? Grade"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
