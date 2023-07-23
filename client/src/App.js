import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './Chat'; // Import the Chat component
import ChatRoom from './ChatRoom'; // Import the ChatRoom com


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} /> {/* Add this route */}
        <Route path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
