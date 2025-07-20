import React from "react";
import ChatInterface from "./ChatInterface";
import { TopBar } from "../Dashboard/TopBar";
import { ChatBotTopBar } from "./TopBar";


function Chatbot() {
  return (
    <div className="shadow-lg rounded-md">
      <ChatBotTopBar />
      <ChatInterface />
    </div>
  );
}

export default Chatbot;
