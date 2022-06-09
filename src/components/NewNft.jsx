import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import "tachyons";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
const apiUrl = "https://frontier-backend1.herokuapp.com";
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "access_token"
)}`;

const theme = createTheme();
function NewNft() {
  const [images, setImages] = React.useState();
  const [loading, setloading] = useState(false)
  let navigate = useNavigate()

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title");
    const description = data.get("description");
    const formData = new FormData();
    let count = 0;
    title != "" ? formData.append("title", title) : count++;
    description != "" ? formData.append("description", description) : count++;
    images != undefined ? formData.append("image", images) : count++;
    if (count === 0) {
      setloading(true);
      axios
        .post(`${apiUrl}/assets`, formData)
        .then((res) => {
          setloading(false);
          console.log(res)
          notify("Asset Created successfully", res.status);
          data.set("title", "")
          data.set("description", "")
        })
        .catch((err) => {
          setloading(false);
          if (err.response.data.statusCode === 401 && err.response.data.message === "Unauthorized") {
            notify(err.response.data.message + ' Session Expired');
            localStorage.removeItem("access_token");
            localStorage.removeItem("firstName");
            localStorage.removeItem("address")
            localStorage.removeItem("fullAddress")
            setTimeout(() => {
              navigate("/SignIn", { replace: true });
            }, 4000)
          }
          notify(err.response.data.message + ' Code-' + err.response.data.statusCode);

        });
    } else {
      notify("Title , Description and Image are required")
    }
  };
  return <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AddCircleOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Mint Asset
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} >
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="type"
                label="Type"
                name="type"
                autoComplete="type"
                defaultValue="NFT"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                name="price"
                label="price"
                type="Price"
                id="price"
              />
            </Grid> */}
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
                  /></Button>
              </div>
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <SaveAsIcon />
            Create Asset
            {loading && <ClipLoader color={"white"} size={30} />}
          </Button>
        </Box>
      </Box>
    </Container>
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
  </ThemeProvider>
}

export default NewNft;
