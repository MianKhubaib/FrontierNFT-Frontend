import React from "react";
import './Scroll.module.css'
const Scroll = (props) => {
  return (
    <div
      style={{
        overflowY: "auto",
        border: "2px solid green",
        height: "400px",
        width: "770px",
        overscrollBehaviorY: "clip",
        overflowInline: "clip",
      }}
      className="center justify-between"
    >
      {props.children}
    </div>
  );
};

export default Scroll;
