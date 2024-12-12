import { cdn } from "../../config/config";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-center">
        <p className="mb-4 animate-pulse">
          Wait for us a little bit, we are preparing the best routine
        </p>
        <div className="w-16 m-auto animate-pulse">
          <img src={`${cdn.icons}logo.ico`} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
