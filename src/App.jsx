import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

export default function App ()  {  
  const [room, setRoom] = useState(1);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [messages, setMessages] = useState([]);

  const [theme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  }); 

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
      const arr = [...messages]
      console.log(arr);
      arr.push(data.message)
      console.log(arr);
      setMessages(arr);
    
      // setMessages([...messages, data.message]);
      // console.log(messages);
    });
  }, [socket]);

  useEffect(() => {
    joinRoom(); 
  },[messages])

  return (
    <div className="App dark:text-white">
      <h1>Room Number: {room} </h1>
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
        <ul>
            {
              messages.map((message, index) => {
                <li key={index} >{message}</li>
              })
            }
        </ul>
    </div>
  );
}

