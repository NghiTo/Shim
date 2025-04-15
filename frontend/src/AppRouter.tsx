import TeacherRegister from "./components/Register/TeacherRegister";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import ErrorFallback from "./components/shared/ErrorFallBack";
import RejectedRoute from "./components/shared/RejectedRoute";
import CreateQuiz from "./components/Teacher/Quiz/CreateQuiz";
import UserInfo from "./components/Teacher/Profile/UserInfo";
import Setting from "./components/Teacher/Setting/Setting";
import Library from "./components/Teacher/Library/Library";
import MainSignUp from "./components/Register/MainSignUp";
import Occupation from "./components/Register/Occupation";
import GoogleLogin from "./components/shared/GoogleLogin";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./components/shared/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import Loading from "./components/shared/Loading";
import ResetPassword from "./pages/ResetPassword";
import DeleteAccount from "./pages/DeleteAccount";
import Register from "./pages/Register";
import { lazy, Suspense } from "react";
import Login from "./pages/Login";


const Home = lazy(() => import("./pages/Home"));
const Teacher = lazy(() => import("./pages/Teacher"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <RejectedRoute>
          <Home />
        </RejectedRoute>
      </Suspense>
    ),
    errorElement: <ErrorFallback />,
  },
  {
    path: "/signup",
    element: (
      <RejectedRoute>
        <Register />
      </RejectedRoute>
    ),
    errorElement: <ErrorFallback />,
    children: [
      {
        path: "",
        element: <MainSignUp />,
      },
      {
        path: "/signup/occupation",
        element: (
          <GoogleLogin>
            <Occupation />
          </GoogleLogin>
        ),
      },
      {
        path: "/signup/teacher",
        element: <TeacherRegister />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <RejectedRoute>
        <Login />
      </RejectedRoute>
    ),
    errorElement: <ErrorFallback />,
  },
  {
    path: "/forgot-password",
    element: (
      <RejectedRoute>
        <ForgotPassword />
      </RejectedRoute>
    ),
    errorElement: <ErrorFallback />,
  },
  {
    path: "/reset-password/:token",
    element: (
      <RejectedRoute>
        <ResetPassword />
      </RejectedRoute>
    ),
    errorElement: <ErrorFallback />,
  },
  {
    path: "/delete-account",
    element: (
      <ProtectedRoute>
        <DeleteAccount />
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallback />,
  },
  {
    path: "/teacher",
    element: (
      <Suspense fallback={<Loading />}>
        <GoogleLogin>
          <ProtectedRoute>
            <Teacher />
          </ProtectedRoute>
        </GoogleLogin>
      </Suspense>
    ),
    errorElement: <ErrorFallback />,
    children: [
      {
        path: "/teacher/profile/:id",
        element: <UserInfo />,
      },
      {
        path: "/teacher/settings",
        element: <Setting />,
      },
      {
        path: "/teacher/library",
        element: <Library />,
      },
    ],
  },
  {
    path: "/teacher/create-quiz/:quizId",
    element: (
      <ProtectedRoute>
        <CreateQuiz />
      </ProtectedRoute>
    ),
    errorElement: <ErrorFallback />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
