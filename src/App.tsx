import { useState } from "react";
import LoginModal from "./components/auth/loginModal";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import Navbar from "./components/navbar/navbar";
import RegisterModal from "./components/auth/registerModal";

function App() {
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const handleLoginBtn = () => {
    setOpenLogin(!openLogin);
  };
  const handleRegisterBtn = () => {
    setOpenRegister(!openRegister);
  };

  const login = true;

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar
          onOpenLogin={handleLoginBtn}
          onOpenRegister={handleRegisterBtn}
        />
        {!login && <Home onOpen={handleLoginBtn} />}

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
