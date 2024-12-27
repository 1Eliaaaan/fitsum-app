import { useNavigate } from "react-router-dom";
import { cdn } from "../../config/config";
import useUserStore from "../../store/useUserStore";
type props = {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  isAuthenticated: boolean;
  profiling_form: number;
};

function Navbar({
  onOpenRegister,
  onOpenLogin,
  isAuthenticated,
  profiling_form,
}: props) {
  const navigate = useNavigate();
  const { logout } = useUserStore();
  function handleClick(button: string) {
    if (!isAuthenticated) {
      navigate("/");
    } else if (isAuthenticated && profiling_form !== 1) {
      navigate("/profiling");
    } else {
      navigate(button);
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between w-full h-20 px-4 md:px-10">
      <div className="w-10">
        <img src={`${cdn.icons}logo.ico`} alt="Logo" />
      </div>

      <div className="ml-4 text-center font-medium text-xl md:text-3xl">
        Fitsum
      </div>

      <div className="hidden md:flex justify-center items-center ml-20 gap-20 pt-1">
        <button
          onClick={() => handleClick("profile")}
          className="text-center font-thin cursor-pointer text-sm md:text-xl focus:font-bold focus:text-1xl"
        >
          Profile
        </button>

        <button
          onClick={() => handleClick("routine")}
          className="text-center font-thin cursor-pointer text-sm md:text-xl focus:font-bold focus:text-1xl"
        >
          Routine
        </button>

        <button
          onClick={() => handleClick("recipes")}
          className="text-center font-thin cursor-pointer text-sm md:text-xl focus:font-bold focus:text-1xl"
        >
          Recipes
        </button>
      </div>

      {!isAuthenticated ? (
        <div className="flex items-center gap-2 ml-auto pt-0 md:ml-auto md:gap-4 md:pt-4">
          <button
            onClick={onOpenLogin}
            className="bg-orange-500 text-xs h-10 w-24 md:h-12 md:w-36 rounded-xl text-white drop-shadow-xl hover:bg-orange-300"
          >
            Login
          </button>
          <button
            onClick={onOpenRegister}
            className="bg-white border border-orange-500 text-xs h-10 w-24 md:h-12 md:w-36 rounded-xl text-black drop-shadow-xl hover:bg-orange-300"
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 ml-auto pt-0 md:ml-auto md:gap-4 md:pt-4">
          <button
            onClick={logout}
            className="border border-blue-900 text-blue-900 text-xs h-10 w-24 md:h-12 md:w-36 rounded-xl drop-shadow-xl hover:bg-blue-800 hover:text-white hover:border-white"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
