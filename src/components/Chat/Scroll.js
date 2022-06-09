import React from "react";

const Scroll = (props) => {
  return (
    <div
      style={{
        overflowY: "auto",
        border: "2px solid green",
        height: "400px",
        width: "770px",
        overscrollBehaviorY: "contain",
        overflowInline: "contain",
      }}
      className="center justify-between"
    >
      {props.children}
    </div>
  );
};

export default Scroll;
