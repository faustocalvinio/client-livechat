import { useContext } from "react";
import { SidebarChatItem } from "./SidebarChatItem";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";

export const Sidebar = () => {
   const chats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

   const { chatState } = useContext(ChatContext);

   const { auth } = useContext(AuthContext);

   return (
      <div className="inbox_chat">
         {chatState.usuarios.filter( usuario => usuario.uid !== auth.uid ).map((usuario) => (
            <SidebarChatItem key={usuario.uid} usuario={usuario} />
         ))}

         {/* <!-- Espacio extra para scroll --> */}
         <div className="extra_space"></div>
      </div>
   );
};
