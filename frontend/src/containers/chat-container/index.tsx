import Chat from "../../components/chat-bot/chat";
import styled from "styled-components";

const Container = styled.div`
  
`;
const ChatContainer = () => {
    return (
        <Container>
            <Chat onClose={() => { /* handle close action */ }} />
        </Container>
    )
}
export default ChatContainer;