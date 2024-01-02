import { Link } from "react-router-dom";
import bannerImg from "/Banner.gif";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <p className="font-bold text-6xl md:pl-2">
            Git
            <span className="text-blue-300">Formed</span>
          </p>
          <p className="p-5 text-xl">
          Where code becomes collaborative art. 🖥️✨
          </p>
          <Link to={"/login"}>
            <button className="btn bg-[#4463B9] text-white font-bold">
              Lets Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
