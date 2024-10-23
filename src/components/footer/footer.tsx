import { cdn } from "../../config/config";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center space-y-6 md:flex-row md:justify-between md:space-y-0">
        <div>
          <img src={`${cdn.icons}logo.ico`} alt="" className="w-12 h-12" />
        </div>

        <div className="flex space-x-6 justify-center md:ml-52">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-2xl hover:text-gray-400" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-2xl hover:text-gray-400" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-2xl hover:text-gray-400" />
          </a>
        </div>

        <div className="text-sm text-center md:text-right">
          © {new Date().getFullYear()} Fitsum. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
