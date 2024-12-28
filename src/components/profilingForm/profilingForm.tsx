import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { cdn } from "../../config/config";
import Loader from "../loader/loader";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import { userService } from "../../services/userService";
const ProfilingForm = () => {
  const navigate = useNavigate();
  const userId = useUserStore((state) => state.userId);
  const profiling_form = useUserStore((state) => state.profiling_form);
  const [firstForm, setFirstForm] = useState<boolean>(false);
  const setProfilingForm = useUserStore((state) => state.setProfilingForm);
  const [loader, setLoader] = useState<boolean>(false);
  const name = useUserStore((state) => state.name);

  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [objective, setObjective] = useState<string>("");
  const [trainingDays, setTrainingDays] = useState<number>(1);

  function handleFirstForm() {
    setFirstForm(!firstForm);
  }

  const handleFinish = async () => {
    const formData = {
      username: name,
      gender,
      age,
      height,
      weight,
      objective,
      training_days: trainingDays,
      profiling_form: 1,
    };
    try {
      setLoader(true);
      await userService.updateUserProfile(formData, userId);
      await userService.createUserRoutines(formData, userId);
      await userService.createUserRecipes(formData, userId);
      setProfilingForm(1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(!loader);
      navigate("/profile");
    }
  };

  if (profiling_form === 1) {
    console.log(profiling_form);
    navigate("/profile");
  }
  return (
    <div>
      {!firstForm && !loader ? (
        <div className="flex flex-col items-start justify-start ml-24 slide-in-left">
          <div className="text-left font-inter text-3xl md:text-5xl font-extrabold w-full my-4 md:my-8">
            <h1 className="leading-tight">Let's get to know objectives</h1>
          </div>

          <div className="text-left font-normal text-xl md:text-2xl my-8 w-full md:w-full">
            <h1>Make your routines and fitness recipes with Fitsum</h1>
          </div>

          <div className="flex gap-8">
            <button
              className={`bg-gray-200 h-10 w-36 rounded-xl my-8 drop-shadow-lg font-inter hover:border hover:border-black focus:bg-zinc-700 focus:text-white ${
                gender === "Male" ? "bg-zinc-700 text-white" : ""
              }`}
              onClick={() => setGender("Male")}
            >
              Male
            </button>
            <button
              className={`bg-gray-200 h-10 w-36 rounded-xl my-8 drop-shadow-lg font-inter hover:border hover:border-black focus:bg-zinc-700 focus:text-white ${
                gender === "Female" ? "bg-zinc-700 text-white" : ""
              }`}
              onClick={() => setGender("Female")}
            >
              Female
            </button>
          </div>
          <div className="flex gap-8 my-8">
            <input
              type="number"
              placeholder="Age"
              className="font-thin text-center placeholder:text-center bg-gray-200 w-36 h-10 rounded-lg drop-shadow-lg"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="flex gap-8 my-8">
            <input
              type="text"
              placeholder="Height"
              className="font-thin text-center placeholder:text-center bg-gray-200 w-36 h-10 rounded-lg drop-shadow-lg"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <select
              name="height"
              className="font-inter text-center placeholder:text-center bg-gray-200 w-36 h-10 rounded-lg drop-shadow-lg"
            >
              <option value="cm">cm</option>
            </select>
          </div>
          <div className="flex gap-8 my-8">
            <input
              type="text"
              placeholder="Weight"
              className="font-thin text-center placeholder:text-center bg-gray-200 w-36 h-10 rounded-lg drop-shadow-lg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <select
              name="weight"
              className="font-inter text-center placeholder:text-center bg-gray-200 w-36 h-10 rounded-lg drop-shadow-lg"
            >
              <option value="kg">kg</option>
            </select>
          </div>
          <div className="flex my-8">
            <button
              onClick={handleFirstForm}
              className="bg-yellow-300 font-inter text-white w-52 h-14 rounded-lg my-8 flex items-center justify-center"
            >
              Next
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      ) : firstForm && !loader ? (
        <div className="flex flex-col items-start justify-start ml-24 slide-in-left">
          <div className="text-left font-inter text-3xl md:text-5xl font-extrabold w-full my-4 md:my-8">
            <h1 className="leading-tight">Let's get to know objectives</h1>
          </div>

          <div className="text-left font-normal text-xl md:text-2xl my-8 w-full md:w-full">
            <h1>Make your routines and fitness recipes with Fitsum</h1>
          </div>
          <p className="font-thin">What is your objective?</p>

          <div className="flex gap-8">
            <button
              className={`bg-gray-200 h-36 w-36 rounded-xl font-normal my-8 drop-shadow-lg hover:border hover:border-black focus:bg-slate-200 focus:text-black focus:invert ${
                objective === "Lose Fat" ? "bg-slate-200 invert" : ""
              }`}
              onClick={() => setObjective("Lose Fat")}
            >
              <img
                src={`${cdn.images}lose-fat.png`}
                alt=""
                className="w-16 h-20 m-auto invert"
              />
              Lose Fat
            </button>
            <button
              className={`bg-gray-200 h-36 w-36 rounded-xl font-normal my-8 drop-shadow-lg hover:border hover:border-black focus:bg-slate-200 focus:text-black focus:invert ${
                objective === "Gain Muscle" ? "bg-slate-200 invert" : ""
              }`}
              onClick={() => setObjective("Gain Muscle")}
            >
              <img
                src={`${cdn.images}gain-muscle.png`}
                alt=""
                className="w-16 h-20 m-auto"
              />
              Gain Muscle
            </button>
          </div>
          <div>
            <p className="font-thin">How many day a week can you train?</p>
            <select
              name="trainingDays"
              className="font-inter my-4 text-center placeholder:text-center bg-gray-200 w-36 h-10 rounded-lg drop-shadow-lg"
              value={trainingDays}
              onChange={(e) => setTrainingDays(Number(e.target.value))}
            >
              {[...Array(7)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex my-8 gap-6 ml-8">
            <button
              onClick={handleFirstForm}
              className="bg-white font-inter border border-yellow-300 text-yellow-300 w-28 h-14 rounded-lg my-4 flex items-center justify-center"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>
            <button
              onClick={handleFinish}
              className="bg-yellow-300 font-inter text-white w-28 h-14 rounded-lg my-4 flex items-center justify-center"
            >
              Next
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ProfilingForm;
