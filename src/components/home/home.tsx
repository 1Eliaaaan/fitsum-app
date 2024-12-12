import { FaArrowRight } from "react-icons/fa";
import { cdn } from "../../config/config";
import { Dumbbell, Salad, Target } from "lucide-react";
type props = {
  onOpen: () => void;
};

function Home({ onOpen }: props) {
  return (
    <>
      <div className="flex">
        <div className="block ml-24 w-4/12">
          <div className="text-left font-inter text-2xl w-full md:text-5xl font-extrabold md:w-full my-4 md:my-8">
            <h1 className="leading-tight slide-in-left">
              Make your routines and fitness recipes with Fitsum
            </h1>
          </div>

          <div className="text-left font-inter text-xl text-gray-500 md:text-1xl font-light my-12 w-full md:w-full md:my-2">
            <h1 className="slide-in-left">
              Fitsum is an innovative platform that combines artificial
              intelligence with the world of fitness. Designed to help you
              achieve your health goals, Fitsum creates personalized workout
              routines and healthy recipes tailored to your objectives, needs,
              and lifestyle. With Fitsum, your well-being is in the best
              technological hands.
            </h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-14 items-center justify-center md:my-4 ml-48">
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
      </div>
      <div className="flex align-center ml-24 mt-10">
        <button
          className="bg-yellow-400 h-12 w-40 text-white rounded-xl hover:bg-white hover:text-black hover:border hover:border-yellow-300 mb-12 drop-shadow-xl flex items-center justify-center motion-safe:animate-bounce"
          onClick={onOpen}
        >
          Get Started
          <FaArrowRight className="ml-2" />
        </button>
      </div>
      <div>
        <section className="container px-4 py-12 md:py-24 lg:py-10  m-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Personalized Goals</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Set and track your fitness goals with AI-powered recommendations
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Smart Workouts</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Get customized workout routines tailored to your fitness level
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Salad className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Healthy Recipes</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Discover nutritious recipes that complement your workout routine
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
