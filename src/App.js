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
import Particles, { ISourceOptions } from "react-tsparticles";
import { loadFull } from "tsparticles";

function App() {
  const [toggleNavbar, setToggleNavbar] = useState(true);
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <>
      {true ? (
        <>
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                  resize: true,
                },
                modes: {
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: "#0d47a2",
                },
                links: {
                  color: "#0d47a2",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                collisions: {
                  enable: true,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 2,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 60,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 5 },
                },
              },
              detectRetina: true,
            }}
          />
          {toggleNavbar && <Navbar />}
          <Routes>
            <Route path="/*" element={<Main />} />
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
          <Route path="/*" element={<SignIn />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      )}
    </>
  );
}

export default App;
