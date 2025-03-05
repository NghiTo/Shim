import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RootState } from "../../store/store";
import { setUser } from "../../store/userReducer";
import { useMutation } from "@tanstack/react-query";
import { createGoogleUser } from "../../apis/auth.api";
import { onError } from "../../constants/onError";

const Occupation = () => {
  const user = useSelector((state: RootState) => state.user);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = searchParams.get("token");

  const { mutate } = useMutation({
    mutationFn: (role: string) => createGoogleUser(token as string, role),
    onSuccess: (res) => {
      dispatch(setUser({ ...res?.data, role: "teacher", isAuthUser: true }));
      navigate("/teacher");
    },
    onError: onError,
  });

  const registerTeacher = () => {
    if (token) {
      mutate("teacher");
    } else {
      dispatch(setUser({ ...user, role: "teacher" }));
      navigate("/signup/teacher");
    }
  };

  useEffect(() => {
    if (!user.email && !token) {
      navigate("/signup");
    }
  }, [user, navigate, token]);

  return (
    <div className="bg-gray-100 w-2/3 min-h-full mx-auto rounded-lg flex flex-col max-md:w-full px-8">
      <h1 className="text-center text-2xl py-8 font-semibold">I am</h1>
      <div className="flex flex-row max-md:flex-col gap-6 pb-8">
        <div className="w-1/3 max-md:w-full flex flex-col max-md:flex-row max-md:px-2 gap-4 items-center rounded-md text-center px-8 py-4 border-gray-400 cursor-pointer border hover:shadow-xl">
          <img
            src="/src/assets/signup-student.png"
            alt="Student"
            className="w-1/2 max-md:w-1/5 object-cover"
          />
          <div className="flex flex-col max-md:text-left">
            <h1 className="text-xl font-semibold">a student</h1>
            <p>to participate in fun classroom activities</p>
          </div>
        </div>
        <div
          onClick={registerTeacher}
          className="w-1/3 max-md:w-full max-md:flex-row max-md:px-2 flex flex-col gap-4 items-center rounded-md text-center px-8 py-4 border-gray-400 cursor-pointer border hover:shadow-xl"
        >
          <img
            src="/src/assets/signup-teacher.png"
            alt="Teacher"
            className="w-1/2 object-cover max-md:w-1/5"
          />
          <div className="flex flex-col max-md:text-left">
            <h1 className="text-xl font-semibold">a teacher</h1>
            <p>to instruct, engage, and assess my students</p>
          </div>
        </div>
        <div className="w-1/3 max-md:w-full max-md:flex-row max-md:px-2 flex flex-col gap-4 items-center rounded-md text-center px-8 py-4 border-gray-400 cursor-pointer border hover:shadow-xl">
          <img
            src="/src/assets/signup-admin.png"
            alt=""
            className="w-1/2 object-cover max-md:w-1/5"
          />
          <div className="flex flex-col max-md:text-left">
            <h1 className="text-xl font-semibold">an administrator</h1>
            <p>instructional coach, curriculum or school lead</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Occupation;
