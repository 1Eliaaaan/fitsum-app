import { cdn } from "../../config/config";

function Navbar() {
  return (
    <div className="flex flex-wrap items-center justify-between w-full h-20 px-4 md:px-10">
      {/* Logo */}
      <div className="w-10">
        <img src={`${cdn.icons}logo.ico`} alt="Logo" />
      </div>

      {/* Navbar title */}
      <div className="ml-4 text-center font-medium text-xl md:text-3xl">
        Fitsum
      </div>

      {/* Links (hidden on mobile, shown on larger screens) */}
      <div className="hidden md:flex justify-center items-center ml-20 gap-20 pt-1">
        <p className="text-center font-thin text-sm md:text-xl">Profile</p>
        <p className="text-center font-thin text-sm md:text-xl">Routine</p>
        <p className="text-center font-thin text-sm md:text-xl">Recipes</p>
      </div>

      {/* Buttons */}
      <div className="flex items-center ml-auto gap-4 pt-4">
        <button className="bg-orange-500 text-xs h-10 w-28 md:h-12 md:w-36 rounded-xl text-white drop-shadow-xl hover:bg-orange-300">
          Login
        </button>
        <button className="bg-white border border-orange-500 text-xs h-10 w-28 md:h-12 md:w-36 rounded-xl text-black drop-shadow-xl hover:bg-orange-300">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
