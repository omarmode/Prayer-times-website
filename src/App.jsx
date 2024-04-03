import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// import MainComponent from "./Components/MainComponent";
import { Container } from "@mui/material";
import MainComponent from "./Components/MainComponent";
import Lottiee from "./Components/Lottie";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <Container maxWidth="xl">
          <MainComponent />
          <Lottiee />
        </Container>
      </div>
    </>
  );
}

export default App;
