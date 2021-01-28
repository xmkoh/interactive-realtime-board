import React from 'react';
import { Socket } from 'socket.io-client';
import ChatForm from './ChatForm';
import ChatMessages, { ChatMsg } from './ChatMessages';
import './style.css';

const Chatbox: React.FC<{socket:Socket}> = ({socket}) => {
  const [messages, setMessages] = React.useState<ChatMsg[]>([]);
  React.useEffect(() => {
    socket.on('chatMsg', (msg: ChatMsg) => {
      setMessages([msg, ...messages]);
    });
  }, [messages]);
  return (
    <div id="chatbox-container">
      <ChatForm socket={socket}></ChatForm>
      <ChatMessages messages={messages}></ChatMessages>
    </div>
  );
};

export default Chatbox;