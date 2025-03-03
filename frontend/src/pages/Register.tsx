import { Link, Outlet } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex flex-col gap-3 mb-8">
      <div className="py-4 px-4 flex flex-row items-center">
        <Link to={"/"} className="w-1/12 max-md:w-1/4">
          <img
            src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
            alt="Logo"
            className="w-full h-auto object-cover"
          />
        </Link>
        <div className="flex flex-row gap-4 ml-auto max-md:hidden">
          <Link
            to={""}
            className="px-8 py-2 text-[#fe5f5c] bg-[#f6f0ff] hover:bg-[#ece0fd] transition-all duration-100 ease-in-out rounded-md"
          >
            Join a game
          </Link>
          <Link
            to={"/login"}
            className="px-8 py-2 bg-[#fe5f5c] rounded-md text-white hover:bg-[#f8a09f] transition-all ease-in-out"
          >
            Login
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Register;
