import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useRef } from "react";

const backURL=import.meta.env.VITE_BACK_URL
const socket = io.connect(backURL);


export default function App ()  {  
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


  const textInput = useRef();
  const usernameTextInput = useRef();
  const [room] = useState(1);
  const [username, setUsername] = useState('anon')
  const [allMessagesFromBackend, setAllMessagesFromBackend] = useState([
   
  ])


  const onSubmitUsername=(e)=>{
    e.preventDefault();
    if (usernameTextInput.current.value === "") return;
    setUsername(usernameTextInput.current.value);
    usernameTextInput.current.classList.add('hidden')
  }

  // const onSubmitMessage=(e)=>{
  //   e.preventDefault();
  //   if (textInput.current.value === "") return;
    
  //   socket.emit("send_message",textInput.current.value)
  //   console.log(textInput.current.value);
  //   setAllMessagesState([...allMessagesState,textInput.current.value]);
  //   textInput.current.value = '';
  // }
  
  const onSubmitMessage=(e)=>{
    e.preventDefault();
    if (textInput.current.value === "") return;
    socket.emit("send_message",{message:textInput.current.value,room,user:username})
    setAllMessagesFromBackend([...allMessagesFromBackend,{message:textInput.current.value,room,user:username}]);
    textInput.current.value = '';
  }
  


  

  useEffect(() => {  
    joinRoom();      
    socket.on("new_message", (data) => {
      console.log(data);
      setAllMessagesFromBackend(data)
    })      
  },[])

  return (
    <div className="dark:bg-black dark:text-white max-w-[1100px] mx-auto  flex flex-col justify-between min-h-[90vh] max-[1100px]:w-[90%] max-[1100px]:mx-auto">
      <div className="flex flex-col gap-4">
        <form action="" onSubmit={onSubmitUsername}>
          <input className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full py-2 px-6  w-full" 
          ref={usernameTextInput}
          type="text" name="" id="" placeholder="username" />
        </form>
        
        <h1 className="text-xl">Welcome {username} !!! Room Number: {room} </h1> 
        
        <h4 className="text-xl">{allMessagesFromBackend.length!==0 ? 'Todos los mensajes' : 'No hay mensajes para mostrar' }</h4>
        <ul>
          {
            allMessagesFromBackend.map((message)=><li className="text-xl" key={crypto.randomUUID()}><span className={`${username===message.user? 'text-blue-400' : 'text-red-400'}`}>{message.user}</span> : {message.message}</li>)
          }
       </ul>
      </div>
            
      
      
        <form action="" className="flex gap-2 w-full justify-center max-sm:flex-col"  onSubmit={onSubmitMessage}>
        
          <input
            placeholder="Message..."
            className="bg-gray-200 dark:bg-gray-700 rounded-full py-2 px-6 w-[80%] border-2 border-gray-500 max-[820px]:w-[60%] max-sm:w-full"            
            ref={textInput}           
          />
          <button type="submit" className="bg-blue-700 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded-full w-[20%] max-[820px]:w-[40%] max-sm:w-full">Send Message</button>
      </form>
    </div>
  );
}

