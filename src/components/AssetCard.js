import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "tachyons";
import ClipLoader from "react-spinners/ClipLoader";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const apiUrl = "https://frontier-backend1.herokuapp.com";
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "access_token"
)}`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AssetCard = ({
  id,
  title,
  description,
  imagePath,
  onDelete,
  type,
  price,
  result,
}) => {
  const [open, setOpen] = useState(false);
  const [openDialog, setDialog] = React.useState(false);
  const [openDialogUpdate, setDialogUpdate] = React.useState(false);
  const [images, setImages] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickOpenUpdate = () => setDialogUpdate(true);
  const handleCloseDialogUpdate = () => setDialogUpdate(false);
  const handleClickOpen = () => setDialog(true);
  const handleCloseDialog = () => setDialog(false);
  useEffect(() => {}, []);
  const notify = (message) =>
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleUpdateSubmit = (event) => {
    console.log("hi", id);

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title");
    const description = data.get("description");
    const formData = new FormData();

    let count = 0;
    title != "" ? formData.append("title", title) : count++;
    description != "" ? formData.append("description", description) : count++;
    images != undefined ? formData.append("image", images) : count++;

    console.log("count", count, title, description, formData);
    if (count !== 3) {
      setLoading(true);
      axios
        .patch(`${apiUrl}/assets/update/${id}`, formData)
        .then((res) => {
          console.log(res);
          notify("Asset updated successfully");
          setLoading(false);
          setDialogUpdate(false);
          result(true);
        })
        .catch((err) => {
          notify(err.response.data.message);
          setLoading(false);
        });
    } else {
      notify("At least Update one value");
    }
  };

  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete(`${apiUrl}/assets/${id}`)
      .then((res) => {
        notify("Asset deleted successfully");
        setLoading(false);
      })
      .catch((err) => {
        notify(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <>
      <Card className="dib " sx={{ maxWidth: 300, p: 3, m: 3, maxHeight: 300 }}>
        {open && (
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <CardMedia
                  component="img"
                  height="300"
                  image={imagePath}
                  alt="green iguana"
                />
                <Typography
                  className="tc center"
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  {title}-{type}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                  Description : {description}
                </Typography>
                <br />
                <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                  Current Price : {price}$
                </Typography>
              </Box>
            </Modal>
          </div>
        )}
        <Tooltip title="Click to see details">
          <CardActionArea onClick={() => setOpen(true)}>
            <CardMedia
              component="img"
              height="120"
              image={imagePath}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description.length > 25
                  ? description.substring(0, 26)
                  : description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Tooltip>
        <Tooltip title={openDialog ? "" : "Delete Asset"}>
          <IconButton>
            <DeleteIcon onClick={handleClickOpen} />
            {openDialog && (
              <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialog}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Delete Asset?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Are Sure to Delete, {title} Asset
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      handleDelete(id);
                      onDelete(id);
                      handleCloseDialog();
                    }}
                  >
                    Yes
                    {loading && <ClipLoader color={"white"} size={30} />}
                  </Button>
                  <Button
                    onClick={() => {
                      handleCloseDialog();
                    }}
                  >
                    No
                  </Button>
                </DialogActions>
              </Dialog>
            )}
          </IconButton>
        </Tooltip>
        {/* Update Icon */}
        <Tooltip
          sx={{ marginLeft: 17 }}
          title={openDialogUpdate ? "" : "Update Asset"}
        >
          <IconButton>
            <EditIcon onClick={handleClickOpenUpdate} />
            {openDialogUpdate && (
              <Dialog
                open={openDialogUpdate}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialogUpdate}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{`Update Asset - ${title}`}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleUpdateSubmit}
                      sx={{ mt: 3 }}
                    >
                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <TextField
                            autoComplete="title"
                            name="title"
                            fullWidth
                            id="title"
                            label="Title"
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            autoComplete="family-name"
                          />
                        </Grid>
                      </Grid>
                      <br />
                      <Grid item xs={12}>
                        <div className="flex">
                          <Button>
                            <input
                              type="file"
                              name="image"
                              required={true}
                              onChange={(event) => {
                                event.preventDefault();
                                const img = event.target.files[0];
                                setImages(img);
                              }}
                            />
                          </Button>
                        </div>
                      </Grid>

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Update
                        {loading && <ClipLoader color={"white"} size={30} />}
                      </Button>
                    </Box>
                  </DialogContentText>
                </DialogContent>
              </Dialog>
            )}
          </IconButton>
        </Tooltip>
        <div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Card>
    </>
  );
};
export default AssetCard;
