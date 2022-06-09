import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { ToastContainer, toast } from "react-toastify";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


// import {Link } from "react-router-dom"
const pages = ["Mint", "Listing", "Community"];


const ResponsiveAppBar = () => {

  const [anchorElNav, setAnchorElNav] = useState("");
  const [address, setAddress] = useState("Connect MetaMask")
  const [fullAddress, setFullAddress] = useState("")
  const [showButton, setShowButton] = useState(true)


  useEffect(() => {
    if (localStorage.getItem("address")) {
      setAddress(localStorage.getItem("address"))
      setFullAddress(localStorage.getItem("fullAddress"))
      setShowButton(false)
    }
  }, [])


  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("address")
    localStorage.removeItem("fullAddress")
    window.location.href = "/SignIn";
  };
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

  const handleMetaMask = async () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(res => {
          localStorage.setItem('fullAddress', res)
          setFullAddress(res)
          let addressSaved = res[0].substring(0, 5) + "..." + res[0].substring(32, 36)
          setAddress(addressSaved)
          setShowButton(false)
          localStorage.setItem('address', addressSaved)
          localStorage.setItem('fullAddress', res)
        })
      window.ethereum.on('accountsChanged', function (res) {
        setFullAddress(res)
        let addressSaved = res[0].substring(0, 5) + "..." + res[0].substring(32, 36)
        setAddress(addressSaved)
        notify('Account Changed Successfully')
      })
    }
    else {
      notify('Please install MetaMask Extension')
    }
  }



  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleDisconnect = () => {
    localStorage.removeItem("address");
    localStorage.removeItem("fullAddress");
    setShowButton(true)
    setFullAddress("")
    setAddress("Connect MetaMask")
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Frontier AIF
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Frontier AIF
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href={`/${page}`} sx={{ my: 2, color: "white" }}>
                  {page}
                </Link>
              </Button>
            ))}
          </Box>
          {!showButton && <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ bgcolor: "White", p: 1, m: -1 }}>MetaMask</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <Tooltip title={fullAddress}>
                  <MenuItem>{address}</MenuItem>
                </Tooltip>
                <MenuItem onClick={handleDisconnect} sx={{ color: "black", p: 2 }}>Disconnect</MenuItem>
              </Select>
            </FormControl>
          </Box>}
          {showButton && <Button
            textAlign="center"
            variant="outlined"
            sx={{ color: "black", bgcolor: "yellow", p: 2 }}
            onClick={handleMetaMask}
          >
            {address}
          </Button>}

          <Button
            className="grow"
            textAlign="center"
            sx={{ color: "white", bgcolor: "red", p: 2, m: 3 }}
            onClick={handleLogout}
          >
            Logout
          </Button>

        </Toolbar>
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
    </AppBar>
  );
};
export default ResponsiveAppBar;
