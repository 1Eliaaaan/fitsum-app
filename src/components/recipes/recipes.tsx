import { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import useUserStore from "../../store/useUserStore";
import { userService } from "../../services/userService";

export default function Recipes() {
  const [popupData, setPopupData] = useState<any | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean[]>([]);
  const [showRightArrow, setShowRightArrow] = useState<boolean[]>([]);
  const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const userId = useUserStore((state) => state.userId);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) {
      fetchUserRoutines();
    }
  }, [userId]);

  const fetchUserRoutines = async () => {
    try {
      setLoading(true);
      const data = await userService.getUserRecipes(userId);
      setRecipes(data.recipes.recipes);
      console.log(data.recipes.recipes);
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

  // const checkScrollPosition = (index: number) => {
  //   const container = scrollContainerRefs.current[index];
  //   if (container) {
  //     const leftArrowVisible = container.scrollLeft > 0;
  //     const rightArrowVisible =
  //       container.scrollLeft < container.scrollWidth - container.clientWidth;

  //     setShowLeftArrow((prev) => {
  //       const newState = [...prev];
  //       newState[index] = leftArrowVisible;
  //       return newState;
  //     });
  //     setShowRightArrow((prev) => {
  //       const newState = [...prev];
  //       newState[index] = rightArrowVisible;
  //       return newState;
  //     });
  //   }
  // };

  // useEffect(() => {
  //   scrollContainerRefs.current = scrollContainerRefs.current.slice(
  //     0,
  //     recipes.length
  //   );

  //   recipes.forEach((_, index) => {
  //     const container = scrollContainerRefs.current[index];
  //     if (container) {
  //       container.addEventListener("scroll", () => checkScrollPosition(index));
  //       checkScrollPosition(index); // Initial check
  //     }
  //   });

  //   return () => {
  //     recipes.forEach((_, index) => {
  //       const container = scrollContainerRefs.current[index];
  //       container?.removeEventListener("scroll", () =>
  //         checkScrollPosition(index)
  //       );
  //     });
  //   };
  // }, []);
  if (!userId) return <div>Please Login</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {recipes.map((recipe: any, index: number) => (
        <div
          key={index}
          className="relative max-w-screen-2xl mx-auto p-4 rounded-lg my-8 "
        >
          <div className="w-48 h-42 bg-orange-500 rounded-r-lg flex border border-orange-500 leading-tight slide-in-left">
            <p className="m-auto text-white font-inter text-2xl">
              {recipe.type}
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
            {recipe.list.map((list: any, idx: number) => (
              <div key={idx} className="flex">
                <div className="flex-shrink-0 m-auto px-12">
                  <div className="relative w-72 h-48 overflow-hidden bg-yellow-500 flex rounded-lg group">
                    <img
                      className="h-full w-full rounded-lg transition-all duration-300 group-hover:blur-sm"
                      src={
                        "https://d19o0ng1o3cl3u.cloudfront.net/fitsum-app/images/food-min.jpg"
                      }
                      alt=""
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <h3 className="text-lg font-semibold">{list.name}</h3>
                      <button
                        className="mt-2 px-4 py-2 bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
                        onClick={() => setPopupData(list)}
                      >
                        How to prepare
                      </button>
                    </div>
                  </div>
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

      {/* Popup */}
      {popupData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className="block">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl w-full">
              <div className="flex justify-end">
                <p
                  onClick={() => setPopupData(null)}
                  className="cursor-pointer text-black text-lg font-bold"
                >
                  &times;
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div>
                  <h2 className="text-3xl font-semibold mb-4">
                    {popupData.name}
                  </h2>
                  <p className="text-xl font-inter mb-6 mt-6">Ingredients</p>
                  <div className="space-y-2 h-80 overflow-y-scroll bg-slate-300 rounded-xl p-4">
                    {popupData.ingredients.map(
                      (ingredient: any, index: number) => (
                        <div key={index} className="flex items-center">
                          <div className="h-2 w-2 mt-1 mr-4 rounded bg-orange-500"></div>
                          <p>{ingredient}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="">
                  <img
                    src={
                      "https://d19o0ng1o3cl3u.cloudfront.net/fitsum-app/images/food-min.jpg"
                    }
                    alt={popupData.name}
                    className="h-52 object-contain rounded-xl"
                  />
                  <p className="text-center text-2xl font-semibold pl-2 pt-4">
                    How to prepare
                  </p>
                  <div className="bg-red-400 h-12 w-24 flex justify-center items-center rounded-xl m-auto mt-12 cursor-pointer">
                    <a
                      className="m-auto"
                      href={popupData.videoExample}
                      target="_blank"
                    >
                      See videos
                    </a>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-semibold mb-4">
                    Nutritional Table
                  </h1>
                  <div className="w-64 h-96 rounded-xl bg-orange-200 overflow-y-scroll">
                    {popupData.nutritional.map((n: any, index: number) => (
                      <div className="flex items-center ml-4">
                        <div className="h-2 w-2 mt-2 mr-4 rounded bg-orange-500"></div>
                        <p key={index} className="pl-2 pt-2">
                          {n}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
