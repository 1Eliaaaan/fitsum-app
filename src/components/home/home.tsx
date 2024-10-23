import { FaArrowRight } from "react-icons/fa";
import { cdn } from "../../config/config";
import Modal from "../auth/modal";

function Home() {
  return (
    <>
      <div className="text-left font-inter text-3xl w-3/6 md:text-6xl font-extrabold md:w-3/6 m-auto my-4 md:my-8">
        <h1 className="leading-tight slide-in-left">
          Make your routines and fitness recipes with Fitsum
        </h1>
      </div>

      <div className="text-left font-inter text-xl md:text-2xl font-light my-12 w-3/6 md:w-3/6 m-auto md:my-12">
        <h1 className="slide-in-left">
          Make your routines and fitness recipes with Fitsum
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-14 items-center justify-center md:my-4">
        <img
          src={`${cdn.images}food-min.jpg`}
          alt="food"
          className="rounded-xl w-64 md:w-80 h-56 slide-in-left"
        />
        <img
          src={`${cdn.images}gym-min.jpg`}
          alt="gym"
          className="rounded-xl w-64 md:w-80 h-56 slide-in-right"
        />
      </div>

      <div className="flex align-center justify-center m-auto mt-16">
        <button className="bg-yellow-400 h-12 w-40 text-white rounded-xl hover:bg-white hover:text-black hover:border hover:border-yellow-300 mb-12 drop-shadow-xl flex items-center justify-center motion-safe:animate-bounce">
          Get Started
          <FaArrowRight className="ml-2" />
        </button>
      </div>
      <Modal />
    </>
  );
}

export default Home;
