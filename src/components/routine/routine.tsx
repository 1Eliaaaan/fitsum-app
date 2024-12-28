import { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import useUserStore from "../../store/useUserStore";
import { userService } from "../../services/userService";

export default function Routine() {
  const userId = useUserStore((state) => state.userId);
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showLeftArrow, setShowLeftArrow] = useState<boolean[]>([]);
  const [showRightArrow, setShowRightArrow] = useState<boolean[]>([]);

  const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (userId) {
      fetchUserRoutines();
    }
  }, [userId]);

  const fetchUserRoutines = async () => {
    try {
      setLoading(true);
      const data = await userService.getUserRoutines(userId);
      setRoutines(data.routines.routines);
      console.log(data.routines.routines);
    } catch (err) {
      setError("Error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction: "left" | "right", index: number) => {
    const container = scrollContainerRefs.current[index];
    if (container) {
      const scrollAmount =
        direction === "left" ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const checkScrollPosition = (index: number) => {
    const container = scrollContainerRefs.current[index];
    if (container) {
      const leftArrowVisible = container.scrollLeft > 0;
      const rightArrowVisible =
        container.scrollLeft < container.scrollWidth - container.clientWidth;

      setShowLeftArrow((prev) => {
        const newState = [...prev];
        newState[index] = leftArrowVisible;
        return newState;
      });
      setShowRightArrow((prev) => {
        const newState = [...prev];
        newState[index] = rightArrowVisible;
        return newState;
      });
    }
  };

  useEffect(() => {
    if (routines) {
      scrollContainerRefs.current = scrollContainerRefs.current.slice(
        0,
        routines.length
      );

      routines.forEach((_, index) => {
        const container = scrollContainerRefs.current[index];
        if (container) {
          container.addEventListener("scroll", () =>
            checkScrollPosition(index)
          );
          checkScrollPosition(index);
        }
      });

      return () => {
        routines.forEach((_, index) => {
          const container = scrollContainerRefs.current[index];
          container?.removeEventListener("scroll", () =>
            checkScrollPosition(index)
          );
        });
      };
    }
  }, [routines]);

  if (!userId) return <div>Please Login</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (routines)
    return (
      <div>
        {routines.map((routine: any, index: number) => (
          <div
            key={index}
            className="relative max-w-screen-2xl mx-auto p-4 rounded-lg my-8"
          >
            <div className="leading-tight slide-in-left w-48 h-42 bg-orange-500 rounded-r-lg flex border border-orange-500">
              <p className="m-auto text-white font-inter text-2xl">
                {"Day " + (index + 1)}
              </p>
            </div>
            <div
              ref={(el) => (scrollContainerRefs.current[index] = el)}
              className=" leading-tight slide-in-left flex overflow-x-auto space-x-4 p-4 border border-orange-00  rounded-r-lg scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
              {routine.exercise.map((exercise: any, idx: number) => (
                <div
                  key={idx}
                  className="relative flex bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 rounded-lg group overflow-hidden"
                >
                  <div className="flex-shrink-0 m-auto">
                    <div className="w-72 bg-slate-00 flex rounded-lg">
                      <div className="m-auto justify-center items-center">
                        <p className="text-xl font-inter font-bold text-center text-white">
                          {exercise.exercise}
                        </p>
                        <p className="text-sm font-inter text-center mt-2 flex">
                          <span className="text-white font-bold">
                            Exercise Duration:
                          </span>
                          {exercise.duration}
                        </p>
                        <p className="text-sm font-inter text-center flex">
                          <span className="text-white font-bold">Reps:</span>
                          {exercise.reps}
                        </p>
                        <p className="text-sm font-inter text-center flex">
                          <span className="text-white font-bold">Sets:</span>
                          {exercise.sets}
                        </p>
                        <p className="text-sm font-inter text-center flex">
                          <span className="text-white font-bold">
                            Calories:
                          </span>
                          {exercise.calories}
                        </p>
                      </div>
                    </div>
                    <div className="m-auto text-center items-center justify-center flex">
                      3 min rest
                    </div>
                  </div>

                  <button
                    onClick={() => window.open(exercise.videoUrl, "_blank")}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-bold rounded-lg"
                  >
                    How to do the exercise
                  </button>
                </div>
              ))}
            </div>
            {showLeftArrow[index] && (
              <button
                onClick={() => scroll("left", index)}
                className="absolute left-0 top-40 transform -translate-y-1/2 bg-orange-600 p-2 rounded-full"
              >
                <FaChevronLeft className="text-white" />
              </button>
            )}
            {showRightArrow[index] && (
              <button
                onClick={() => scroll("right", index)}
                className="absolute right-8 top-40 transform -translate-y-1/2 bg-orange-600 p-2 rounded-full"
              >
                <FaChevronRight className="text-white" />
              </button>
            )}
          </div>
        ))}
      </div>
    );
}
