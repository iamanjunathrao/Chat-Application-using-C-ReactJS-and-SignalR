import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as signalR from '@microsoft/signalr';
import './Chat.css'; // Import the chat.css file


function Chat() {
  const [userName, setUserName] = useState('');
  const [chatRoomName, setChatRoomName] = useState('');
  const navigate = useNavigate();
  const hubConnectionRef = React.useRef(null);

  const handleJoinChatroom = () => {
    if (userName && chatRoomName) {
      navigate(`/chatroom?chatroom=${encodeURIComponent(chatRoomName)}&user=${encodeURIComponent(userName)}`);
    }
  };

  return (
    <div>
      <h1 style={{backgroundColor: "lightblue" }}>Connect - chat app!</h1>
      <div>
        <input type="text" className='name' placeholder="Your Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <input
          type="text"
          className='chatroom'
          placeholder="Chat Room Name"
          value={chatRoomName}
          onChange={(e) => setChatRoomName(e.target.value)}
        />
        <button onClick={handleJoinChatroom} className='joinchat'>Join Chatroom</button>
      </div>
    </div>
  );
}

export default Chat;
