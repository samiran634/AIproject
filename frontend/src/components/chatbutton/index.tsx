import styled from "styled-components";
import ChatBotImage from "../../imeges/chatbot.png";  
const ChatButtonContainer = styled.div`
  position: fixed;
  bottom: 10vh;
  right: 2em;
  z-index: 1000;
  background-image: url(${ChatBotImage});
  background-size: cover;
  background-position: center;
  width: 100px;
  height: 100px;
  cursor: pointer;
  animation: blink-and-shake 3s infinite;

  @keyframes blink-and-shake {
    0%, 100% {
      opacity: 1;
      transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translateX(-5px);
    }
    20%, 40%, 60%, 80% {
      transform: translateX(5px);
    }
    45%, 55% {
      opacity: 0.5;
    }
  }
`;

interface ChatButtonProps {
  collapsed: boolean;
  onClick: () => void;
}

const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    <ChatButtonContainer onClick={onClick} />
  );
};

export default ChatButton;
