import React from "react";

const Chatbox = ({
  message,
  sentBy,
  receivedBy,
  user,
  currentChat,
  createdAt,
}) => {
  let userSelf = true;
  let currentChatCheck = false;

  if (
    (sentBy === currentChat && receivedBy === user) ||
    (receivedBy === currentChat && sentBy === user)
  ) {
    currentChatCheck = true;
    if (user !== sentBy) {
      userSelf = false;
    }
  }

  return (
    <>
      {currentChatCheck && (
        <section className="mw7-ns center bg-light-green pa1 ph4-ns">
          <h3 className={userSelf ? "tr" : "tl"}>{message}</h3>
          <h6 className={userSelf ? "tr" : "tl"}>{userSelf ? sentBy : ""} {userSelf ? "" : sentBy}</h6>
          <h6 className={userSelf ? "tr" : "tl"}>{createdAt}</h6>
        </section>
      )}
    </>
  );
};

export default Chatbox;
