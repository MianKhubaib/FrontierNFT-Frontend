import React, { useState } from "react";

const Userbox = ({ contactName, onCurrentChatHandler, userName }) => {
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
          <div className="bg-light-yellow grow f3 w-100 ph3-ns mr3 pa2 justify-between">
            <div class="pa4 tc"></div>
            <button onClick={withChatHandler} value={contactName}>
              {contactName}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Userbox;
