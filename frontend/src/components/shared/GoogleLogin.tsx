import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userReducer";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { getGoogleUser } from "../../apis/auth.api";

interface GoogleLoginProps {
  children: React.ReactNode;
}

const GoogleLogin = ({ children }: GoogleLoginProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [isDispatched, setIsDispatched] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["google"],
    queryFn: getGoogleUser,
    staleTime: 1000 * 5,
  });

  useEffect(() => {
    if (data && !isDispatched) {
      if (data.id) {
        dispatch(setUser({ ...user, ...data, isAuthUser: true }));
      } else {
        dispatch(setUser({ ...user, ...data }));
      }
      setIsDispatched(true);
    }
  }, [data, dispatch, user, isDispatched]);

  if (isLoading || !isDispatched) return <Loading />;

  return children;
};

export default GoogleLogin;
