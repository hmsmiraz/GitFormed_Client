import { FaXTwitter, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-stone-200 text-primary-content">
      <aside>
        <img src="/vite.svg" className="w-10 rounded-full" />
        <p className="font-bold">
          Git
          <span className="text-[#4463B9]">Formed</span>
        </p>
        <p>Copyright ©hmsmiraz 2023 - All right reserved</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4 text-2xl">
          <Link to="https://github.com/hmsmiraz">
            <FaGithub />
          </Link>
          <Link to="https://www.linkedin.com/in/hassan-md-sharfuddin-miraz-51b254172/">
            <FaLinkedin />
          </Link>
          <Link to="https://www.facebook.com/hassanmdsharfuddin.miraz.9">
            <FaFacebook />
          </Link>
          <Link to="https://twitter.com/hmsmiraz">
            <FaXTwitter />
          </Link>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;