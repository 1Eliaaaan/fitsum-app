import { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import routines from "./routines";

export default function Routine() {
  const [showLeftArrow, setShowLeftArrow] = useState<boolean[]>([]);
  const [showRightArrow, setShowRightArrow] = useState<boolean[]>([]);
  const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    scrollContainerRefs.current = scrollContainerRefs.current.slice(
      0,
      routines.length
    );

    routines.forEach((_, index) => {
      const container = scrollContainerRefs.current[index];
      if (container) {
        container.addEventListener("scroll", () => checkScrollPosition(index));
        checkScrollPosition(index); // Initial check
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
  }, []);

  return (
    <div>
      {routines.map((routine: any, index: number) => (
        <div
          key={index}
          className="relative max-w-screen-2xl mx-auto p-4 rounded-lg my-8"
        >
          <div className="w-48 h-42 bg-orange-500 rounded-r-lg flex border border-orange-500">
            <p className="m-auto text-white font-inter text-2xl">
              {"Day " + (index + 1)}
            </p>
          </div>
          <div
            ref={(el) => (scrollContainerRefs.current[index] = el)}
            className="flex overflow-x-auto space-x-4 p-4 border border-orange-00 bg-slate-200 rounded-r-lg scroll-smooth"
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
            {routine.excercise.map((exercise: any, idx: number) => (
              <div key={idx} className="flex">
                <div className="flex-shrink-0 m-auto">
                  <div className="w-72 h-48 overflow-hidden bg-yellow-500 flex rounded-lg">
                    <div className="ml-4 mt-4 w-1/2 justify-center items-center">
                      <p className="text-xl font-inter font-bold">
                        {exercise.exercise}
                      </p>
                      <p className="text-sm font-inter text-left mt-2">
                        {exercise.duration}
                      </p>
                      <p className="text-xs font-inter text-left">
                        {"REPS " + exercise.reps}
                      </p>
                      <p className="text-xs font-inter text-left">
                        {"SETS " + exercise.sets}
                      </p>
                      <p className="text-xs font-inter text-left">
                        {"CALORIES " + exercise.calories}
                      </p>
                    </div>
                    <a
                      className="h-24 w-24 bg-black m-auto rounded-lg "
                      href={exercise.videoUrl}
                      target="_blank"
                    >
                      <img
                        className="h-24 w-24 rounded-lg "
                        src={exercise.imgUrl}
                        alt=""
                      />
                    </a>
                  </div>
                </div>
                <div className="w-24 h-24 m-auto ml-4 text-center items-center justify-center flex ">
                  3 min rest
                </div>
              </div>
            ))}
          </div>
          {showLeftArrow[index] && (
            <button
              onClick={() => scroll("left", index)}
              className="absolute left-0 top-40 transform -translate-y-1/2 bg-blue-900 p-2 rounded-full"
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-white" />
            </button>
          )}
          {showRightArrow[index] && (
            <button
              onClick={() => scroll("right", index)}
              className="absolute right-8 top-40 transform -translate-y-1/2 bg-blue-900 p-2 rounded-full"
              aria-label="Scroll right"
            >
              <FaChevronRight className="text-white" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
