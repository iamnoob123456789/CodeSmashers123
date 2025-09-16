import React, { useState } from "react";
import "../styles/chatbot.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    // TODO: call backend AI API here
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", text: "This is a placeholder response." }]);
    }, 1000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages([...messages, { sender: "user", text: `📂 Uploaded file: ${file.name}` }]);
      // TODO: send file to backend
    }
  };

  const handleVoice = () => {
    alert("🎤 Voice input feature not yet implemented.");
    // TODO: Use Web Speech API or Whisper for STT
  };

  return (
    <div className="chatbot-container chatbot-full">
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>➤</button>
        <button onClick={handleVoice}>🎤</button>
        <label className="file-upload">
          📎
          <input type="file" hidden onChange={handleFileUpload} />
        </label>
      </div>
    </div>
  );
}
