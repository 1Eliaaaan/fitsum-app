import { useState } from "react";
import LoginModal from "./components/auth/loginModal";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import Navbar from "./components/navbar/navbar";
import RegisterModal from "./components/auth/registerModal";
import ProfilingForm from "./components/profilingForm/profilingForm";

function App() {
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const [profilingFormFinished, setProfilingFormFinished] =
    useState<boolean>(false);

  const handleLoginBtn = () => {
    setOpenLogin(!openLogin);
  };
  const handleRegisterBtn = () => {
    setOpenRegister(!openRegister);
  };
  const handleProfilingForm = () => {
    setProfilingFormFinished(!profilingFormFinished);
  };

  const loginStatus = true;

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar
          onOpenLogin={handleLoginBtn}
          onOpenRegister={handleRegisterBtn}
          loginStatus={loginStatus}
        />
        {!loginStatus && <Home onOpen={handleLoginBtn} />}
        {loginStatus && !profilingFormFinished && (
          <ProfilingForm onFinished={handleProfilingForm} />
        )}
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
