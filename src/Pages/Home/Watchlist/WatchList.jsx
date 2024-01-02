import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useWatchList from "../../../Hooks/useWatchList";
import Button from "@mui/material/Button";

const WatchList = () => {
  const [watchList, , refetch] = useWatchList();
  const { user } = useAuth();
  const email = user?.email;
  const axiosPublic = useAxiosPublic();
  const filteredWatchList = watchList.filter( (item) => item.email == email );
//   console.log(filteredWatchList)
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
            `/watchList/${item._id}`
          );
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${item.repositoryName} has been deleted from Watch List!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      });
  }
  return (
    <div>
      <h2 className="font-bold text-2xl text-blue-500 text-center">
        All Your Watch List Here!
      </h2>
      <div className="overflow-x-auto my-5">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Repository Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredWatchList.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.repositoryName}</td>
                <td>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WatchList;
