import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface MainLoginProps {
  setContinueEmail: (value: boolean) => void;
}

const MainLogin: React.FC<MainLoginProps> = ({ setContinueEmail }) => {
  return (
    <div className="w-3/5 max-md:w-full py-4 px-8">
      <h1 className="font-medium text-2xl">Log in to Shim</h1>
      <div className="flex flex-row cursor-pointer items-center gap-6 mt-4 border border-gray-300 p-2 rounded-lg hover:shadow-lg">
        <img src="/src/assets/google-logo-1.png" className="w-6" alt="Google" />
        <p className="font-medium text-xl">Continue with Google</p>
        <FaArrowRight className="ml-auto" />
      </div>
      <button
        onClick={() => setContinueEmail(true)}
        className="w-full flex flex-row items-center cursor-pointer gap-6 mt-4 border border-gray-300 p-2 rounded-lg hover:shadow-lg"
      >
        <img
          src="/src/assets/envelope-regular.png"
          className="w-6"
          alt="Google"
        />
        <p className="font-medium text-xl">Continue with Email</p>
        <FaArrowRight className="ml-auto" />
      </button>
      <Link
        to={""}
        className="flex flex-row items-center gap-6 mt-4 border border-gray-300 p-2 rounded-lg hover:shadow-lg"
      >
        <img src="/src/assets/facebook(1).png" className="w-6" alt="Google" />
        <p className="font-medium text-xl">Continue with Facebook</p>
        <FaArrowRight className="ml-auto" />
      </Link>
      <div className="text-center mt-4">or continue with</div>
      <div className="flex flex-row items-center justify-center gap-4 mt-2">
        <div className="flex flex-col justify-center items-center">
          <Link
            to={""}
            className="w-12 h-12 bg-white shadow-lg flex items-center justify-center p-3 rounded-sm"
          >
            <img src="/src/assets/ms-logo.png" alt="Microsoft" />
          </Link>
          <p className="text-sm">Microsoft</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link
            to={""}
            className="w-12 h-12 bg-white shadow-lg flex items-center justify-center p-1 rounded-sm"
          >
            <img src="/src/assets/Phone.png" alt="Phone" />
          </Link>
          <p className="text-sm">Phone</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link
            to={""}
            className="w-12 h-12 bg-black flex items-center justify-center p-2 rounded-sm"
          >
            <img src="/src/assets/Apple.png" alt="Apple" />
          </Link>
          <p className="text-sm">Apple</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link
            to={""}
            className="w-12 h-12 bg-[#fe5f5c] flex items-center justify-center p-3 rounded-sm"
          >
            <img
              src="/src/assets/shield-halved.png"
              className="w-full h-full"
              alt="Others"
            />
          </Link>
          <p className="text-sm">Others</p>
        </div>
      </div>
      <div className="flex flex-row mt-8 justify-center items-center gap-2 max-md:hidden">
        <p className="py-1">Forgot password?</p>
        <Link
          to={"/forgot-password"}
          className="underline italic hover:text-[#fe5f5c]"
        >
          Get your password
        </Link>
      </div>
      <div className="flex flex-row justify-center gap-2 max-md:hidden">
        <p className="py-1">Don't have an account?</p>
        <Link
          to={"/signup"}
          className="py-1 px-4 rounded-md bg-gray-200 text-[#fe5f5c]"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default MainLogin;
