// ChatHandeler.tsx
import React from "react";
import ChatButton from "./chatbot-btn";
import ChatBotContainer from "./chatbotcontainer";

interface ChatHandlerProps {
  isChatVisible: boolean;
  handleButtonClick: () => void;
}

const ChatHandeler: React.FC<ChatHandlerProps> = ({ isChatVisible, handleButtonClick }) => {
  return (
    <>
      <ChatButton onClick={handleButtonClick} isChatVisible={isChatVisible} onToggle={handleButtonClick} />
      <ChatBotContainer isVisible={isChatVisible} onClose={handleButtonClick} onToggle={handleButtonClick} />
    </>
  );
};

export default ChatHandeler;
