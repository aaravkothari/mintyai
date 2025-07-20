import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";

function ChatInterface() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "bot", text: "Hello! How can I assist you today?" }
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() === "") return;

    const newMessage = { sender: "user", text: message };
    setMessages([...messages, newMessage]);

    try {
      const res = await axios.post("http://127.0.0.1:8080/chatbot", { message });
      const botMessage = { sender: "bot", text: res.data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      console.log(res.data.response);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[535px]">
      <div className="p-6 rounded-lg shadow-lg w-full flex flex-col h-full">
        <div className="flex-grow overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 p-2 rounded ${msg.sender === "user" ? "bg-green-700 text-white text-sm self-end ml-48" : "bg-green-300 text-black text-sm self-start mr-48"}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-4 w-full mt-auto">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-200 text-black"
          />
          <button
            type="submit"
            className="shadow-lg pl-4 pr-3 py-2 hover:bg-green-800 hover:text-green-500 bg-green-600 text-white
                       rounded-md
                       transition-all duration-300 ease-linear 
                       cursor-pointer">
              <IoSend size="22" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInterface;