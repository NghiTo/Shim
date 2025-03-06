import { message, Modal } from "antd";
import { IoSearch } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RootState } from "../../store/store";
import { updateUser } from "../../apis/user.api";
import { getSchools } from "../../apis/school.api";
import { setUser } from "../../store/userReducer";
import { School } from "../../types/school.type";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const ChooseSchool = () => {
  const user = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["schools"],
    queryFn: ({ pageParam = 1 }) => getSchools(pageParam, 6),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore
        ? lastPage.pagination.currentPage + 1
        : undefined,
    enabled: !user.schoolId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (schoolId: string) =>
      updateUser(user.id as string, { schoolId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
      message.success("Update school successfully");
    },
  });

  const handleSave = () => {
    if (selectedSchool) {
      mutate(selectedSchool.id);
      dispatch(setUser({ ...user, schoolId: selectedSchool.id }));
      setIsModalOpen(false);
    }
  };

  const fetchMoreData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (!user.schoolId && user.isAuthUser) {
      setIsModalOpen(true);
    }
  }, [user.schoolId, user.isAuthUser]);
  return (
    <Modal
      title="Select your school"
      open={isModalOpen}
      onOk={handleSave}
      closable={false}
      okText="Save"
      confirmLoading={isPending}
      loading={isLoading}
      centered
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ disabled: !selectedSchool, danger: true }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2 border border-gray-400 rounded-full p-2">
          <IoSearch />
          <input
            type="text"
            className="outline-none w-full"
            placeholder="Enter your school name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
        </div>
        <div
          id="scrollableDiv"
          className="flex flex-col border border-gray-400 rounded-lg h-80 w-full overflow-y-auto "
        >
          <InfiniteScroll
            dataLength={(data && data.pages.length * 6) || 0}
            next={fetchMoreData}
            hasMore={hasNextPage as boolean}
            loader={<div>Loading...</div>}
            scrollableTarget="scrollableDiv"
          >
            {data?.pages.map((page, index) => (
              <div key={index}>
                {page.data
                  .filter((school: School) =>
                    school.name.toLowerCase().includes(searchQuery)
                  )
                  .map((school: School) => (
                    <div
                      key={school.id}
                      onClick={() => setSelectedSchool(school)}
                      className={`h-1/5 w-full items-center px-4 py-3 hover:bg-gray-200 cursor-pointer flex flex-row ${
                        selectedSchool?.id === school.id ? "bg-blue-100" : ""
                      }`}
                    >
                      <div className="flex flex-col">
                        <p className="font-normal">{school.name}</p>
                        <span className="text-gray-500">
                          {school.city + ", " + school.country}
                        </span>
                      </div>
                      {selectedSchool?.id === school.id && (
                        <FaCheck className="text-green-500 ml-auto" />
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </Modal>
  );
};

export default ChooseSchool;
