import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const CreateRepo = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const authorEmail = user?.email;
  const date = new Date();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    const repositoryName = data.name;
    const repositories = {
      authorEmail,
      repositoryName,
      createdDate: date,
      watching: 0,
      Code:"",
      language:"",
    };
    console.log(repositories);
    const result = await axiosPublic.post("/repositories", repositories);
    if (result.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${repositoryName} add to DB.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="m-5">
      <h2 className="text-3xl my-10 text-center font-bold">
        Create Your Repository!
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" md:w-3/4 lg:w-1/2 mx-auto"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Repository Name</span>
          </label>
          <input
            type="text"
            required
            name="name"
            placeholder="Repository Name Should be Unique"
            className="input input-bordered"
            {...register("name", {
              required: true,
              pattern: /^[A-Za-z0-9-_]{5,10}$/,
            })}
          />
          {errors.name?.type === "pattern" && (
            <p className="text-center text-red-600">
              Repository name should contain only letters, numbers, hyphens, or
              underscores and be between 5 to 10 characters.
            </p>
          )}
        </div>
        <div className="form-control mt-6 ">
          <input
            type="submit"
            // disabled={disabled}
            className="btn btn-primary rounded-md text-white"
            value="Register"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateRepo;
