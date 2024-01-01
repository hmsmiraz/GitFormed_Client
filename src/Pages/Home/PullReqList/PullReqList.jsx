import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import usePullReq from "../../../Hooks/usePullReq";
import Button from "@mui/material/Button";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const PullReqList = () => {
  const [pullRequestList, , refetch] = usePullReq();
  const { user } = useAuth();
  const email = user?.email;
  const axiosPublic = useAxiosPublic();
  
  const handleDelete = (item)=>{
    console.log(item._id)
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosPublic.delete(
            `/pullRequest/${item._id}`
          );
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${item.repoName} has been deleted from Pull Req List!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      });
  }
  const handleDetails = (item)=>{
    console.log(item.reqUserEmail)
  }
  return (
    <div>
      <h2 className="text-2xl text-center text-blue-500 font-bold">
        Pull Request List
      </h2>
      <div className="overflow-x-auto my-5">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Repository Name</th>
              <th>Pull Req Date</th>
              <th>Req User Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pullRequestList.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.repoName}</td>
                <td>{item.pullReqDate}</td>
                <td>
                  {email === item.authorEmail ? (
                    <p>Yourself</p>
                  ) : (
                    <p>{item.reqUserEmail}</p>
                  )}
                </td>
                <td>
                  {email === item.authorEmail ? (
                    <Button
                    variant="contained"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </Button>
                  ) : (
                    <Button
                    variant="contained"
                    onClick={() => handleDetails(item)}
                  >
                    Details
                  </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PullReqList;
