import React from "react";
import UserBox from "./Userbox";

const Userboxlist = ({ users, userName, onCurrentChatHandler }) => {
  return (
    <div>
      {users.map((user, i) => {
        return (
          <UserBox
            key={i}
            contactName={user.name}
            userName={userName}
            onCurrentChatHandler={onCurrentChatHandler}
          />
        );
      })}
    </div>
  );
};
export default Userboxlist;
