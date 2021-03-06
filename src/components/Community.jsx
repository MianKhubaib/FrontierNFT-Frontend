import Chatboxlist from "./Chat/ChatBox/Chatboxlist";
import "tachyons";
import { useState, useEffect } from "react";
import Scroll from "./Chat/Scroll/Scroll";
import MessageInput from "./MessageInput";
import Userboxlist from "./Chat/UsersBox/Userboxlist";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pusher from "pusher-js";
import { ToastContainer, toast } from "react-toastify";
import { Typography } from "@mui/material";
const apiUrl = "https://frontier-backend1.herokuapp.com";
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "access_token"
)}`;
function Community() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [ChatWith, setChatWith] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("firstName"));
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${apiUrl}/messages/sync`)
      .then((response) => {
        setMessages(response.data.reverse());
      })
      .catch((err) => {
        if (
          err.response.data.statusCode === 401 &&
          err.response.data.message === "Unauthorized"
        ) {
          notify(err.response.data.message + " Session Expired");
          localStorage.removeItem("access_token");
          localStorage.removeItem("firstName");
          localStorage.removeItem("address");
          localStorage.removeItem("fullAddress");
          setTimeout(() => {
            navigate("/SignIn", { replace: true });
          }, 4000);
        }
        notify(
          err.response.data.message + " Code-" + err.response.data.statusCode
        );
      });
    axios
      .get(`${apiUrl}/users/all`)
      .then((response) => {
        const updatedData = response.data.filter(
          (user) => user.firstName !== userName
        );
        setUsers(updatedData);
        notify("Click on Name Button to start chat with anyone");
      })
      .catch((error) => {
      });
  }, []);

  useEffect(() => {
    Pusher.logToConsole = true;
    var pusher = new Pusher("76e5a0d02d7fd527d3a5", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("message");
    channel.bind("inserted", () => {
      axios
        .get(`${apiUrl}/messages/sync`)
        .then((response) => {
          setMessages(response.data.reverse());
        })
      // alert(JSON.stringify(data));
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const notify = (message) =>
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const messageChangeHandler = (newMessage) => {
    const message = {
      message: newMessage,
      sentBy: userName,
      receivedBy: ChatWith,
    };
    axios.post(`${apiUrl}/messages/new`, message).then((response) => {
    });
    setMessages([...messages, message]);
  };

  const currentChatHandler = (currentChat) => {
    setChatWith(currentChat);
  };

  return (
    <>
      <div className="App">
        {users.length === 0 ? <h1>No user available, you are only User <br /><br /> Ask your friend to SignUp ,then have Chat</h1> :
          <>
            <Userboxlist
              users={users}
              onCurrentChatHandler={currentChatHandler}
              userName={userName}
            />
            {ChatWith !== "" ? <>
              <Typography variant="h6">
                {userName} having Chat with {ChatWith}
              </Typography>
              <span>Scroll down for old messages/Scroll Up for new messages</span>
              <Scroll>
                <Chatboxlist
                  userName={userName}
                  messages={messages}
                  users={users}
                  currentChat={ChatWith}
                />
              </Scroll>

              <MessageInput newmessageChangeHandler={messageChangeHandler} />  </> :
              <Typography variant="h5">Click on Name Button to Start Chat</Typography>
            }
          </>
        }
      </div>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default Community;
