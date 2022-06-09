import React from "react";
import Chatbox from "./Chatbox";

const Chatboxlist = ({ userName, messages, currentChat }) => {
  return (
    <div className="justify-between">
      {messages.map((singleMessage, i) => {
        return (
          <Chatbox
            key={i}
            message={singleMessage.message}
            sentBy={singleMessage.sentBy}
            receivedBy={singleMessage.receivedBy}
            user={userName}
            currentChat={currentChat}
            createdAt={singleMessage.createdAt}
          />
        );
      })}
    </div>
  );
};

export default Chatboxlist;
