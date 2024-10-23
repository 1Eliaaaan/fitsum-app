import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type props = {
  onClose: () => void;
  onOpenRegister: () => void;
};

function LoginModal({ onClose, onOpenRegister }: props) {
  const [showPassword, setShowPassword] = useState(false);

  function handleRegister() {
    onClose();
    onOpenRegister();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 slide-in-left">
      <div className="bg-white rounded-lg p-4 shadow-lg md:h-3/6 md:w-96 w-72 h-4/6">
        <div className="flex justify-end">
          <p
            onClick={onClose}
            className="close cursor-pointer text-black text-lg"
          >
            &times;
          </p>
        </div>
        <div>
          <h1 className="text-2xl font-bold pl-11">Login</h1>
        </div>
        <div className="mt-8 md:mt-8 pl-11">
          <input
            type="text"
            name=""
            id=""
            placeholder="Email"
            className="bg-gray-300 rounded-xl p-4 w-5/6 text-xs placeholder-slate-950"
          />
        </div>
        <form action="">
          <div className="mt-8 md:mt-8 pl-11 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              className="bg-gray-300 rounded-xl p-4 w-5/6 text-xs pr-10 placeholder-slate-950"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[calc(16.67%+0.5rem)] top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5" />
              ) : (
                <FaEye className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="flex items-center pl-14 mt-6">
            <input
              defaultChecked={false}
              id="checked-checkbox"
              type="checkbox"
              value=""
              className="w-3 h-3  bg-gray-100 accent-black border-gray-300 rounded "
            />
            <label
              htmlFor="checked-checkbox"
              className="ms-2 text-xs font-inter font-medium text-gray-900 dark:text-black"
            >
              Remember me
            </label>
          </div>
          <div className="mt-12 flex items-center justify-center">
            <button
              type="submit"
              className="bg-orange-400 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-white hover:text-black hover:border hover:border-orange-400 m-auto w-20 text-xs h-10"
            >
              Login
            </button>
          </div>
        </form>
        <p
          onClick={handleRegister}
          className="text-xs underline pt-8 pl-12 cursor-pointer"
        >
          Not have account? Register Here!
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
