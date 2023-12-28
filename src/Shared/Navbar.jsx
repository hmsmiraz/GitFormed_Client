import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/createRepositories">Create a Repository</NavLink>
      </li>
      <li>
        <NavLink to="/repositories">Repositories</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <div className="w-10 rounded-full">
            <Link to={"/"}>
              <img src="/vite.svg" />
            </Link>
          </div>
          <Link to={"/"}>
            <p className="font-bold text-xl md:pl-2">
              Git
              <span className="text-[#4463B9]">Formed</span>
            </p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {/* {user ? (
              <button onClick={handleSignOut} className="btn btn-neutral">
                Log Out
              </button>
            ) : ( */}
          <Link to="/login">
            <button className="btn bg-[#4463B9] text-white font-bold">
              Login
            </button>
          </Link>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
