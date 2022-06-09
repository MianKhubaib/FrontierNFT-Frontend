import "./App.css";
import React, { useState } from "react";
import SignUp from "./components/Auth/SignUp";
import { Route, Routes } from "react-router-dom";
import "tachyons";
import Navbar from "./components/Navbar";
import Main from "./components/Listing/Main";
import NewNft from "./components/NewNft";
import SignIn from "./components/Auth/SignIn";
import Community from "./components/Community";
function App() {
  const [toggleNavbar, setToggleNavbar] = useState(true);

  return (
    <>
      {localStorage.getItem("access_token") ? (
        <>
          {toggleNavbar && <Navbar />}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Listing" element={<Main />} />
            <Route path="/Mint" element={<NewNft />} />
            <Route path="/Community" element={<Community />} />
            <Route
              path="/SignIn"
              element={<SignIn toggleNavbarFun={setToggleNavbar} />}
            />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      )}
    </>
  );
}

export default App;
