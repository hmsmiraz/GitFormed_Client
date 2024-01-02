import useAuth from "../../../Hooks/useAuth";
import useRepositories from "../../../Hooks/useRepositories";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaEyeSlash } from "react-icons/fa";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Repositories = () => {
  const [repositories, , refetch] = useRepositories();
  const { user } = useAuth();
  const email = user?.email;
  const axiosPublic = useAxiosPublic();
  const date = new Date();
  const [open, setOpen] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);
  const [edit, setEdit] = React.useState(true);
  const [editableItem, setEditableItem] = React.useState(null);
  const [itemUser, setItemUser] = React.useState(null);
  const languages = [
    {
      value: "javascript",
      label: "javascript",
    },
    {
      value: "C++",
      label: "C++",
    },
    {
      value: "python",
      label: "python",
    },
    {
      value: "java",
      label: "java",
    },
  ];
  const handleOpen = (item) => {
    setEditableItem(item);
    setOpen(true);
  };
  const handleOpenUser = (item) => {
    setItemUser(item);
    setOpenUser(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseUser = () => {
    setOpenUser(false);
  };
  const handleChange = (event, Code, language) => {
    editableItem[Code] = event.target.value;
    editableItem[language] = event.target.value;
    setEditableItem({
      ...editableItem,
    });
  };
  const handleUpdate = async (id) => {
    console.log(id);
    setEdit(false);
    console.log(editableItem);
    const res = await axiosPublic.put(`/repositories/${id}`, editableItem);
    console.log(editableItem.data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Code has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
      setOpen(false);
    }
  };
  const handleDelete = async (editableItem) => {
    setOpen(false);
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
          `/repositories/${editableItem._id}`
        );
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${editableItem.repositoryName} has been deleted!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  const handleWatch = async (item) => {
    const watchListDetails = {
      email,
      authorEmail: item.authorEmail,
      repositoryName: item.repositoryName,
    }
    console.log(watchListDetails);
    const result = await axiosPublic.post("/watchList", watchListDetails);
    if (result.data.insertedId) {
      axiosPublic.patch(`/repositories/${item._id}`).then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${item.repositoryName} has been added to watchList!`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
      // Swal.fire({
      //   position: "top-end",
      //   icon: "success",
      //   title: `${item.repositoryName} add to Pull Request List.`,
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
    }
  };
  const handlePullReq = async (item) => {
    const pullReqData = {
      pullReqDate: date,
      repoName: item.repositoryName,
      authorEmail: item.authorEmail,
      reqUserEmail: email,
      repoId: item._id,
    };
    // console.log(pullReqData)
    const result = await axiosPublic.post("/pullRequest", pullReqData);
    if (result.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${item.repositoryName} add to Pull Request List.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-blue-500 text-center">
        All Repositories Here!
      </h2>
      <div className="overflow-x-auto mt-3">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Repository Name</th>
              <th>Created Date</th>
              <th>Total Watcher</th>
              <th>Action</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {repositories.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.repositoryName}</td>
                <td>{item.createdDate}</td>
                <td>
                  {email === item.authorEmail ? (
                    item.watching
                  ) : (
                    <div>{<FaEyeSlash />}</div>
                  )}
                </td>
                <td>
                  {email === item.authorEmail ? (
                    <div>
                      <Button
                        variant="contained"
                        onClick={() => handleOpen(item)}
                      >
                        Add/Edit Code
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        variant="contained"
                        onClick={() => handleOpenUser(item)}
                      >
                        Details
                      </Button>
                    </div>
                  )}
                </td>
                <td>
                  <Button onClick={() => handleWatch(item)} variant="contained">
                    Add to Watch
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => handlePullReq(item)}
                    variant="contained"
                  >
                    Pull Request
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* author model */}
      <Modal
        key={editableItem?._id}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-4">
            <div>
              {edit ? (
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Code: {editableItem?.Code}
                </Typography>
              ) : (
                <TextField
                  name="Code"
                  type="text"
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  defaultValue={editableItem?.Code}
                  onChange={(event) => handleChange(event, "Code")}
                />
              )}
            </div>

            <div>
              {edit ? (
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Language: {editableItem?.language}
                </Typography>
              ) : (
                <TextField
                  name="language"
                  type="text"
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue={editableItem?.language}
                  helperText="Please select your language"
                  onChange={(event) => handleChange(event, "language")}
                >
                  {languages.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </div>
          </div>

          <div className="flex gap-2 items-center justify-end mt-2">
            {edit ? (
              <Button
                variant="contained"
                onClick={() => handleUpdate(editableItem?._id)}
              >
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => handleUpdate(editableItem?._id)}
              >
                Save
              </Button>
            )}
            <Button
              variant="outlined"
              onClick={() => handleDelete(editableItem)}
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
      {/* user model */}
      <Modal
        key={itemUser?._id}
        open={openUser}
        onClose={handleCloseUser}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-4">
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Code: {editableItem?.Code}
              </Typography>
            </div>
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Language: {itemUser?.language}
              </Typography>
            </div>
          </div>

          <div className="flex gap-2 items-center justify-end mt-2">
            <Button variant="outlined" onClick={handleCloseUser}>
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Repositories;
