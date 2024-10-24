import { useState } from "react";
import styled from "styled-components";
import ChatButton from "../chatbutton"; // Adjust the path as necessary
import Chat from "../chat-bot/chat"; // Adjust the path as necessary

const ParentContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 2em;
  z-index: 1000;
`;

const ChatApp = () => {
  const [isChatVisible, setIsChatVisible] = useState(false); // Track whether chat is visible

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <ParentContainer>
      {/* ChatButton is visible when chat is NOT visible */}
      {!isChatVisible && <ChatButton collapsed={isChatVisible} onClick={toggleChatVisibility} />}

      {/* Chat is visible when chat IS visible */}
      {isChatVisible && <Chat onClose={toggleChatVisibility} />}
    </ParentContainer>
  );
};

export default ChatApp;
