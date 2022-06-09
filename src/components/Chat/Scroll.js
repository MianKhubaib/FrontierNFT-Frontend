import React from "react";

const Scroll = (props) => {
  return (
    <div
      style={{
        overflowY: "auto",
        border: "2px solid green",
        height: "500px",
        width: "770px",
        overscrollBehavior: "auto",
        overflowInline: "center",
      }}
      className="center justify-between"
    >
      {props.children}
    </div>
  );
};

export default Scroll;
