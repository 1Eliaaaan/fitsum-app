import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { cdn } from "../../config/config";

type props = {
  onFinished: () => void;
};

const ProfilingForm = ({ onFinished }: props) => {
  const [firstForm, setFirstForm] = useState<boolean>(false);

  function handleFirstForm() {
    setFirstForm(!firstForm);
  }

  return (
    <div>
      {!firstForm ? (
        <div className="flex flex-col items-start justify-start ml-24  slide-in-left">
          <div className="text-left font-inter text-3xl md:text-5xl font-extrabold w-full my-4 md:my-8">
            <h1 className="leading-tight">Let's get to know objectives</h1>
          </div>

          <div className="text-left font-normal text-xl md:text-2xl my-8 w-full md:w-full">
            <h1 className="">
              Make your routines and fitness recipes with Fitsum
            </h1>
          </div>

          <div className="flex gap-8">
            <button className="bg-gray-200 h-10 w-36 rounded-xl my-8 drop-shadow-lg font-inter hover:border hover:border-black focus:bg-zinc-700 focus:text-white">
              Male
            </button>
            <button className="bg-gray-200 h-10 w-36 rounded-xl my-8 drop-shadow-lg font-inter hover:border hover:border-black focus:bg-zinc-700 focus:text-white">
              Female
            </button>
          </div>
          <div className="flex gap-8 my-8">
            <input
              type="text"
              placeholder="Height"
              className="font-thin text-center placeholder:text-center bg-gray-200 w-36 h-10 rounded-lg drop-shadow-lg"
            />
            <select
              name="height"
              id=""
              className="font-inter text-center placeholder:text-center bg-gray-200 w-36 h-10 rounded-lg drop-shadow-lg"
            >
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
          </div>
          <div className="flex gap-8 my-8">
            <input
              type="text"
              placeholder="Weight"
              className="font-thin text-center placeholder:text-center bg-gray-200 w-36 h-10 rounded-lg drop-shadow-lg"
            />
            <select
              name="height"
              id=""
              className="font-inter text-center placeholder:text-center bg-gray-200 w-36 h-10 rounded-lg drop-shadow-lg"
            >
              <option value="cm">kg</option>
              <option value="in">cm</option>
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
      ) : (
        <div className="flex flex-col items-start justify-start ml-24  slide-in-left">
          <div className="text-left font-inter text-3xl md:text-5xl font-extrabold w-full my-4 md:my-8">
            <h1 className="leading-tight">Let's get to know objectives</h1>
          </div>

          <div className="text-left font-normal text-xl md:text-2xl my-8 w-full md:w-full">
            <h1 className="">
              Make your routines and fitness recipes with Fitsum
            </h1>
          </div>
          <p className="font-thin">What is your objective?</p>

          <div className="flex gap-8">
            <button className="bg-gray-200 h-36 w-36 rounded-xl font-normal my-8 drop-shadow-lg  hover:border hover:border-black focus:bg-slate-200 focus:text-black focus:invert">
              <img
                src={`${cdn.images}lose-fat.png`}
                alt=""
                className="w-16 h-20 m-auto invert"
              />
              Lose Fat
            </button>
            <button className="bg-gray-200 h-36 w-36 rounded-xl font-normal my-8 drop-shadow-lg  hover:border hover:border-black focus:bg-slate-200 focus:text-black focus:invert">
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
              name="height"
              id=""
              className="font-inter my-4 text-center placeholder:text-center bg-gray-200 w-36 h-10 rounded-lg drop-shadow-lg"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
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
              onClick={onFinished}
              className="bg-yellow-300 font-inter text-white w-28 h-14 rounded-lg my-4 flex items-center justify-center"
            >
              Next
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilingForm;
