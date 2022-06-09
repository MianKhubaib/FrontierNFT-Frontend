import React from "react";
import Chatbox from "./Chatbox";

const Chatboxlist = ({ userName, users, messages, currentChat }) => {
  return (
    <div className="justify-between">
      {messages.map((singleMessage, i) => {
        return (
          <Chatbox
            key={i}
            message={singleMessage.message}
            sentBy={singleMessage.names[0]}
            receivedBy={singleMessage.names[1]}
            user={userName}
            currentChat={currentChat}
          />
        );
      })}
    </div>
  );
};

export default Chatboxlist;
