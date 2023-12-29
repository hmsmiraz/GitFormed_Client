import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Login = () => {
  const { signIn, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    // console.log(email, password);
    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          title: "Success!",
          text: "Login Successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
        navigate("/dashboard/allTask");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: error,
        });
      });
  };

  const handleGoogleLogin = () => {
    signInGoogle()
      .then((result) => {
        // console.log(result);

        const email = result.user?.email;
        const createdAt = result.user?.metadata?.creationTime;
        const user = {
          email: email,
          createdAt: createdAt,
        };
        axiosPublic.post("/users", user);
        Swal.fire({
          title: "Success!",
          text: "Login Successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: error,
        });
      });
  };
  return (
    <div className="mx-2">
      <h2 className="text-3xl my-10 text-center font-bold">
        Please Login Here!
      </h2>
      <form onSubmit={handleLogin} className=" md:w-3/4 lg:w-1/2 mx-auto">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            required
            name="email"
            placeholder="Email"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            required
            name="password"
            placeholder="Password"
            className="input input-bordered"
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6 ">
          <button className="btn btn-primary text-white">Login </button>
        </div>
      </form>
      <p className="text-center mt-4">
        Do not have an account?{" "}
        <Link className="text-blue-600 font-bold" to="/register">
          Register
        </Link>
      </p>
      <p className="text-center my-2 font-bold">
        <button onClick={handleGoogleLogin} className="btn btn-info text-white">
          <FaGoogle></FaGoogle>
          Google
        </button>
      </p>
    </div>
  );
};

export default Login;