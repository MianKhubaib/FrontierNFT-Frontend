import React, { useState } from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

const Userbox = ({ contactName, onCurrentChatHandler, userName, path }) => {
  const [currentChat, setCurrentChat] = useState("");
  let checkSelfContact = true;
  const withChatHandler = (event) => {
    setCurrentChat(event.target.value);
    onCurrentChatHandler(currentChat);
  };
  if (currentChat === userName) {
    checkSelfContact = false;
  }
  return (
    <>
      {checkSelfContact && (
        <div className="center inline-flex justify-between tc mb3">
          <div className="f3 w-100 ph3-ns mr3 pa2 justify-between">
            <img className="tc center br4" alt="Pic" src={path} />
            <div class="pa tc"></div>
            <Tooltip title={`Start Chat`}>
              <Button
                variant="contained"
                size="large"
                onClick={withChatHandler}
                value={contactName}
              >
                {contactName}
              </Button>
            </Tooltip>
          </div>
        </div>
      )}
    </>
  );
};

export default Userbox;
