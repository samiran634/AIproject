import styled from "styled-components";
import ChatBotImage from "../../images/chatbot.png";  
import { motion } from "framer-motion";

interface ChatButtonProps {
  onClick: () => void;
}

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

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.5, duration: 0.5 }}
  >
    <ChatButtonContainer onClick={onClick} />
  </motion.div>
);

export default ChatButton;
