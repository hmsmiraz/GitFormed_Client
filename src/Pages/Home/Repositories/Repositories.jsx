import { Link } from "react-router-dom";
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
import { RiEdit2Fill } from "react-icons/ri";
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
  const [repositories] = useRepositories();
  const { user } = useAuth();
  const email = user?.email;
  const axiosPublic = useAxiosPublic();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(true);
  const [editableItem, setEditableItem] = React.useState(null);
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
  //   const filteredRepo = repositories.filter(
  //     (repository) => repository.authorEmail == email
  //   );
  //   console.log(filteredRepo);
  const handleOpen = (item) => {
    setEditableItem(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-blue-500 text-center">
        All Repositories Here!
      </h2>
      <div className="overflow-x-auto mt-3">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>repositoryName</th>
              <th>createdDate</th>
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
                    <div>
                      <p className="font-bold">{item.watching}</p>
                    </div>
                  ) : (
                    <div>
                      <Link to={""}>
                        <button className="btn btn-info text-white">
                          Add to Watch
                        </button>
                      </Link>
                    </div>
                  )}
                </td>
                <td>
                  {email === item.authorEmail ? (
                    <div>
                      <Button onClick={() => handleOpen(item)}>
                        <RiEdit2Fill className="text-xl" />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Link to={""}>
                        <button className="btn btn-info text-white">
                          Pull Request
                        </button>
                      </Link>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        key={editableItem?._id}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex gap-4">
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
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Repositories;
