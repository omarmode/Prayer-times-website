import React from "react";
import Lottie from "lottie-react";
import "./Lottie.css";
import eid from "../../public/animation/Animation - 1712024157966.json";
import eid2 from "../../public/animation/Animation - 1712025083163.json";
function Lottiee() {
  return (
    <div className="flexaa">
      <Lottie animationData={eid} style={{ height: "400px" }} />{" "}
      <Lottie animationData={eid2} style={{ height: "400px" }} />{" "}
    </div>
  );
}

export default Lottiee;
