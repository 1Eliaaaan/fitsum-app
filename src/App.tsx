import { useEffect, useState } from "react";
import LoginModal from "./components/auth/loginModal";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import Navbar from "./components/navbar/navbar";
import RegisterModal from "./components/auth/registerModal";
import ProfilingForm from "./components/profilingForm/profilingForm";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./components/profile/profile";
import Routine from "./components/routine/routine";
import Recipes from "./components/recipes/recipes";
import useUserStore from "./hooks/useUserStore";
function App() {
  const navigate = useNavigate();

  const loginStatus = useUserStore((state: any) => state.isLoggedIn);
  const user = useUserStore((state: any) => state.user);
  const profiling_form = useUserStore((state: any) => state.profiling_form);
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  // const [profilingFormFinished, setProfilingFormFinished] =
  //   useState<boolean>(true);

  const handleLoginBtn = () => {
    setOpenLogin(!openLogin);
  };
  const handleRegisterBtn = () => {
    setOpenRegister(!openRegister);
  };
  const handleProfilingForm = () => {
    // setProfilingFormFinished(!profilingFormFinished);
  };

  useEffect(() => {
    console.log("loginStatus", loginStatus);
    if (!loginStatus) {
      navigate("/");
    }
    if (loginStatus && profiling_form !== 1) {
      navigate("/profiling");
    }
    if (loginStatus && profiling_form == 1) {
      navigate("profile");
    }
  }, [loginStatus]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar
          onOpenLogin={handleLoginBtn}
          onOpenRegister={handleRegisterBtn}
          loginStatus={loginStatus}
          profiling_form={profiling_form}
        />

        <Routes>
          <Route path="/" element={<Home onOpen={handleLoginBtn} />} />
          <Route
            path="profiling"
            element={<ProfilingForm onFinished={handleProfilingForm} />}
          />
          <Route
            path="profile"
            element={
              <Profile
                loginStatus={loginStatus}
                profiling_form={profiling_form}
              />
            }
          />
          <Route
            path="routine"
            element={
              <Routine
                loginStatus={loginStatus}
                profiling_form={profiling_form}
              />
            }
          />
          <Route
            path="recipes"
            element={
              <Recipes
                loginStatus={loginStatus}
                profiling_form={profiling_form}
              />
            }
          />
        </Routes>

        <Footer />
        {openLogin && (
          <LoginModal
            onClose={handleLoginBtn}
            onOpenRegister={handleRegisterBtn}
          />
        )}
        {openRegister && (
          <RegisterModal
            onClose={handleRegisterBtn}
            onOpenLogin={handleLoginBtn}
          />
        )}
      </div>
    </>
  );
}

export default App;
