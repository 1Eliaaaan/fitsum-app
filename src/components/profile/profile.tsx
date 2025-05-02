import { FaCloudUploadAlt } from "react-icons/fa";
import { cdn } from "../../config/config";
import useUserStore from "../../store/useUserStore";
import { useEffect, useState, useRef } from "react";
import { userService } from "../../services/userService";

const Profile = () => {
  const userId = useUserStore((state) => state.userId);
  const email = useUserStore((state) => state.email);
  const name = useUserStore((state) => state.name);
  const [profile, setProfile] = useState({ age: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState(`${cdn.icons}placeholder.svg`);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const data = await userService.getUserProfile(userId);
      setProfile(data);
    } catch (err) {
      setError("Error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (!userId) return <div>Please Login</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="font-inter text-3xl w-3/6 md:text-6xl font-extrabold md:w-3/6 ml-24 my-4 md:my-8">
        <h1 className="leading-tight slide-in-left">{name || ""}</h1>
      </div>
      <div className="flex">
        <div>
          <img
            src={profileImage}
            alt="Profile"
            className="leading-tight w-72 h-72 ml-24 rounded-xl object-cover"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <div className="leading-tight flex items-center justify-center ml-24">
            <button 
              onClick={handleUploadClick}
              className="bg-blue-900 h-12 w-12 mt-8 text-white rounded-xl hover:bg-white hover:text-black hover:border hover:border-blue-900 mb-12 drop-shadow-xl flex items-center justify-center"
            >
              <FaCloudUploadAlt />
            </button>
          </div>
        </div>

        <div className="leading-tight">
          <p className="ml-16 font-inter text-xl">Name</p>
          <input
            type="text"
            placeholder="name"
            value={name}
            className="font-inter text-xs my-2 text-left ml-16 pl-4 placeholder:text-center bg-gray-200 w-80 h-12 rounded-lg drop-shadow-lg"
          />
          <p className="ml-16 font-inter text-xl">Email</p>
          <input
            type="text"
            placeholder="email"
            value={email}
            className="font-inter text-xs my-2 text-left ml-16 pl-4 placeholder:text-center bg-gray-200 w-80 h-12 rounded-lg drop-shadow-lg"
          />
          <p className="ml-16 font-inter text-xl">Age</p>
          <input
            type="text"
            placeholder="Age"
            value={profile?.age || ""}
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
        <div className="leading-tight flex items-center justify-center ml-96">
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
};

export default Profile;
