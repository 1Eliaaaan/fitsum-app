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
import { useAuth } from "./hooks/useAuth";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated, profiling_form } = useAuth();

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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    if (isAuthenticated && profiling_form !== 1) {
      navigate("/profiling");
    }
    if (isAuthenticated && profiling_form == 1) {
      navigate("profile");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar
          onOpenLogin={handleLoginBtn}
          onOpenRegister={handleRegisterBtn}
          isAuthenticated={isAuthenticated}
          profiling_form={profiling_form}
        />

        <Routes>
          <Route path="/" element={<Home onOpen={handleLoginBtn} />} />
          <Route path="profiling" element={<ProfilingForm />} />
          <Route path="profile" element={<Profile />} />
          <Route path="routine" element={<Routine />} />
          <Route path="recipes" element={<Recipes />} />
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
