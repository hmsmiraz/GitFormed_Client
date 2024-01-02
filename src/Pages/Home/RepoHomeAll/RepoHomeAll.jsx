import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import useRepositories from "../../../Hooks/useRepositories";
const RepoHomeAll = () => {
  const [repositories] = useRepositories();
  return (
    <div className="my-5">
      <h2 className="text-3xl font-bold text-center text-blue-500 uppercase my-5">
        All Repositories
      </h2>
      <div className="overflow-x-auto my-5">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Repository Name</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {repositories.slice(0, 10).map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.repositoryName}</td>
                <td>{item.createdDate}</td>
                <td>
                  <Link to={"/repositories"}>
                    <Button variant="contained">Details</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RepoHomeAll;
