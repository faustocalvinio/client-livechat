import { AuthProvider } from "./auth/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { ChatProvider } from "./context/chat/ChatContext";
import { AppRouter } from "./router/AppRouter";

export const ChatApp = () => {
   return (
      <ChatProvider>
         <AuthProvider>
            <SocketProvider>
               <AppRouter />
            </SocketProvider>
         </AuthProvider>
      </ChatProvider>
   );
};
