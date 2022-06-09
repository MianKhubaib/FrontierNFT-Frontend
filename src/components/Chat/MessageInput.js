import React, { useState } from "react";

const MessageInput = ({ newmessageChangeHandler }) => {
  const [newMessages, setnewMessages] = useState("");
  const messageChangeHandler = (event) => {
    event.preventDefault();
    setnewMessages(event.target.value);
  };

  const submitChangeHandler = (event) => {
    event.preventDefault();
    newmessageChangeHandler(newMessages);
    setnewMessages("");
  };

  return (
    <section className="mw5 mw7-ns  center bg-light-green pa3 ph5-ns">
      <form onSubmit={submitChangeHandler}>
        <input
          class="input-reset ba b--black-20 pa2 mb2 db w-100"
          type="text"
          aria-describedby="name-desc"
          value={newMessages}
          placeholder="Type your message here , Press Enter to send"
          onChange={messageChangeHandler}
        />
      </form>
    </section>
  );
};

export default MessageInput;
