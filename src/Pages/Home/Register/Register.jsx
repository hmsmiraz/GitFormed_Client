import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "Firebase/auth";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const { createUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");
    setRegisterError("");
    setSuccess("");

    // console.log(name, photo, email, password);
    createUser(email, password)
      .then((result) => {
        setSuccess("User Created Successfully.");
        console.log(result.user);
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            const createdAt = result.user?.metadata?.creationTime;
            const user = {
              email,
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
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="mx-2">
      <h2 className="text-3xl my-10 text-center font-bold">
        Please Register Here!
      </h2>
      <form onSubmit={handleRegister} className=" md:w-3/4 lg:w-1/2 mx-auto">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            required
            name="name"
            placeholder="Name"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            required
            name="photo"
            placeholder="Photo URL"
            className="input input-bordered"
          />
        </div>
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
        <div className="form-control mt-6">
          <button className="btn btn-primary text-white">Register</button>
        </div>
      </form>
      {registerError && (
        <p className="text-red-700 text-center">{registerError}</p>
      )}
      <p className="text-center mt-4 mb-2">
        Already have an account?{" "}
        <Link className="text-blue-600 font-bold" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;