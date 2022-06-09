import Chatboxlist from "./Chat/Chatboxlist";
import "tachyons";
import { useState, useEffect } from "react";
import Scroll from "./Chat/Scroll";
import MessageInput from "./Chat/MessageInput";
import Userboxlist from "./Chat/Userboxlist";

function Community() {
  const [messages, setMessages] = useState([
    {
      message: "newMessage",
      names: ["Mian", "Anyone"],
      timestamp: new Date().getTime,
      receivedBy: "ChatWith",
    },
  ]);
  const [users, setUsers] = useState([
    {
      id: "1",
      firstName: "Mian",
    },
  ]);
  const [ChatWith, setChatWith] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("firstName"));
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    // axios
    //   .get("/messages/sync")
    //   .then((response) => {
    //     setMessages(response.data);
    //     console.log(messages);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // axios
    //   .get("/users")
    //   .then((response) => {
    //     console.log(response);
    //     setUsers(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // Pusher.logToConsole = true;
    // const pusher = new Pusher("c822673020b36ea6d3f5", {
    //   cluster: "ap2",
    // });
    // const channel = pusher.subscribe("messages");
    // channel.bind("inserted", function (data) {
    //   // alert(JSON.stringify(data));
    //   setMessages([...messages, data]);
    // });
    // return () => {
    //   channel.unbind_all();
    //   channel.unsubscribe();
    // };
  }, [messages]);

  const messageChangeHandler = (newMessage) => {
    const message = {
      message: newMessage,
      names: [userName, ChatWith],
      timestamp: new Date().getTime,
      receivedBy: ChatWith,
    };
    // axios.post("/messages/new", message).then((response) => {
    //   console.log("newMessage: " + JSON.stringify(response));
    // });
  };

  const currentChatHandler = (currentChat) => {
    setChatWith(currentChat);
    console.log("currentChat: in APP ", ChatWith);
  };

  return (
    <>
      <div className="App">
        <h3>
          Current User {userName} having Chat with {ChatWith}
        </h3>
        
        <>
          <Userboxlist
            users={users}
            onCurrentChatHandler={currentChatHandler}
            userName={userName}
          />
          <Scroll>
            <Chatboxlist
              userName={userName}
              messages={messages}
              users={users}
              currentChat={ChatWith}
            />
          </Scroll>
        </>
        (
        <MessageInput newmessageChangeHandler={messageChangeHandler} />)
      </div>
    </>
  );
}

export default Community;
