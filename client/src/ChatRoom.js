import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as signalR from '@microsoft/signalr';
import './ChatRoom.css';

function ChatRoom() {
  const location = useLocation();
  const [userName, setUserName] = useState('');
  const [chatRoomName, setChatRoomName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const uniqueMessagesRef = useRef(new Set()); // To track unique messages
  const hubConnectionRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const user = queryParams.get('user');
    const chatroom = queryParams.get('chatroom');

    setUserName(user);
    setChatRoomName(chatroom);

    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5011/chathub') // Replace with your SignalR hub URL
      .withAutomaticReconnect()
      .build();

    connection.on('ReceiveMessage', (user, message) => {
      const messageId = `${user}:${message}`; // Generate a unique identifier for the message
      if (!uniqueMessagesRef.current.has(messageId)) {
        uniqueMessagesRef.current.add(messageId);
        setMessages((prevMessages) => [...prevMessages, { user, message }]);
      }
    });

    connection.start().then(() => {
      hubConnectionRef.current = connection;
      hubConnectionRef.current.invoke('JoinChatroom', chatroom, user); // Join the chat room
    });

    return () => {
      if (hubConnectionRef.current) {
        hubConnectionRef.current.stop();
      }
    };
  }, [location.search]);

  const handleSendMessage = () => {
    if (hubConnectionRef.current && message.trim()) {
      hubConnectionRef.current.invoke('SendMessage', chatRoomName, userName, message);
      setMessage('');
    }
  };

  return (
    <div>
      <h1 style={{ backgroundColor: 'lightgreen' }}>Welcome to Chat Room: {chatRoomName}</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          className="chatbox"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage} className="send">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
