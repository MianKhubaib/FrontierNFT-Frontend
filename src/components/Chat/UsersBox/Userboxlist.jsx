import React from "react";
import UserBox from "./Userbox";

const Userboxlist = ({ users, userName, onCurrentChatHandler }) => {
  return (
    <div>
      {users.map((user, i) => {
        return (
          <UserBox
            key={i}
            contactName={user.firstName}
            userName={userName}
            onCurrentChatHandler={onCurrentChatHandler}
            path="https://random.imagecdn.app/75/75"
          />
        );
      })}
    </div>
  );
};
export default Userboxlist;
