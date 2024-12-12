import { FaCloudUploadAlt } from "react-icons/fa";
import { cdn } from "../../config/config";
import { useNavigate } from "react-router-dom";

type props = {
  loginStatus: boolean;
  profiling_form: number;
};

const Profile = ({ loginStatus, profiling_form }: props) => {
  const navigate = useNavigate();

  if (!loginStatus) {
    navigate("/");
  } else if (loginStatus && profiling_form !== 1) {
    navigate("/profiling");
  } else {
    return (
      <div>
        <div className="font-inter text-3xl w-3/6 md:text-6xl font-extrabold md:w-3/6 ml-24 my-4 md:my-8">
          <h1 className="leading-tight slide-in-left">Elian Hernandez</h1>
        </div>
        <div className="flex">
          <div>
            <img
              src={`${cdn.icons}placeholder.svg`}
              alt=""
              className="w-72 h-72 ml-24 rounded-xl"
            />
            <div className="flex items-center justify-center ml-24">
              <button className="bg-blue-900 h-12 w-12 mt-8 text-white rounded-xl hover:bg-white hover:text-black hover:border hover:border-blue-900 mb-12 drop-shadow-xl flex items-center justify-center ">
                <FaCloudUploadAlt />
              </button>
            </div>
          </div>

          <div>
            <p className="ml-16 font-inter text-xl">Name</p>
            <input
              type="text"
              placeholder="name"
              value={"Elian Hernandez"}
              className="font-inter text-xs my-2 text-left ml-16 pl-4 placeholder:text-center bg-gray-200 w-80 h-12 rounded-lg drop-shadow-lg"
            />
            <p className="ml-16 font-inter text-xl">Email</p>
            <input
              type="text"
              placeholder="name"
              value={"elianhernandezc16@gmail.com"}
              className="font-inter text-xs my-2 text-left ml-16 pl-4 placeholder:text-center bg-gray-200 w-80 h-12 rounded-lg drop-shadow-lg"
            />
            <p className="ml-16 font-inter text-xl">Age</p>
            <input
              type="text"
              placeholder="name"
              value={"23"}
              className="font-inter text-xs my-2 text-left ml-16 pl-4 placeholder:text-center bg-gray-200 w-80 h-12 rounded-lg drop-shadow-lg"
            />
            <p className="ml-16 font-inter text-xl">Change Password</p>
            <input
              type="text"
              placeholder="New Password"
              value={""}
              className="font-inter text-xs my-2 text-left ml-16 pl-4 placeholder:text-left bg-gray-200 w-80 h-12 rounded-lg drop-shadow-lg"
            />
          </div>
          <div className="flex items-center justify-center ml-96">
            <img src={`${cdn.icons}logo.ico`} alt="" className="" />
          </div>
        </div>
        <div className="flex items-center justify-center my-12">
          <button className="bg-yellow-300 h-12 w-72 mt-8 text-white rounded-xl hover:bg-white hover:text-black hover:border hover:border-blue-900 mb-12 drop-shadow-xl flex items-center justify-center ">
            Save
          </button>
        </div>
      </div>
    );
  }
};

export default Profile;
