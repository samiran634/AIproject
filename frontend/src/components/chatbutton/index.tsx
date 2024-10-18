import styled from "styled-components";
import { Button } from "@mui/material";
import ChatBotImage from '../../imeges/chatbot.png';
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
`;

const ChatButton = () => {
  return (
    <ChatButtonContainer>
      <Button variant="contained" color="primary"  >
    
      </Button>
    </ChatButtonContainer>
  );
}
  export default ChatButton;
