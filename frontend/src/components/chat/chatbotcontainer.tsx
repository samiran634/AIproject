import { useState } from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import styled from "styled-components";
import { Avatar, MainContainer, MessageList, MessageInput, TypingIndicator, ChatContainer, ConversationHeader, Message } from "@chatscope/chat-ui-kit-react";
import axios from "axios";
const url="https://api.vultrinference.com/v1/chat/completions"
let apikey="Y4EO6EF6XN5YC2IAEERWB3VKHXA42UOT33QA"
const HTTP = "http://localhost:4000";

const CollapsBtn = styled.div`
  background-image: url("https://img.icons8.com/?size=50&id=11885&format=png&color=000000");
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.7);
`;

interface ChatProps {
  isVisible: boolean;
  onToggle: () => void;
  onClose: () => void;
}

interface MessageType {
  message: string;
  sentTime?: string;
  sender: string;
  direction: "incoming" | "outgoing";
  position: "single" | "first" | "last" | "normal";
}
async function postRequest(message: string) {
  try {
      const response = await axios.post(url, {
          "model": "zephyr-7b-beta-Q5_K_M",
          "messages": [
              {
                  "role": "user",
                  "content": message
              }
          ],
          "max_tokens": 512,
          "seed": -1,
          "temperature": 0.8,
          "top_k": 40,
          "top_p": 0.9,
          "stream": true
      }, {
          headers: {
              authorization: `Bearer ${apikey}`,
          }
      });
      return response;
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
}

const ChatBotContainer: React.FC<ChatProps> = ({ isVisible, onToggle, onClose }) => {
  if (!isVisible) return null; // Render only if visible

  const user = { fullName: "sam", imageUrl: "" };
  const [messages, setMessages] = useState<MessageType[]>([
    {
      message: `Hello ${user.fullName || "User"}, I'm ChatGPT! Ask me anything!`,
      sentTime: "just now",
      sender: "ChatGPT",
      direction: "incoming",
      position: "single",
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message: string) => {
    const newMessage: MessageType = {
      message,
      direction: "outgoing",
      sender: "user",
      position: "single",
    };
    setMessages([...messages, newMessage]);

    setIsTyping(true);
    try {
      const response = await postRequest(message);
      console.log(response.data);

      const data = response.data;
      let completeMessage = "";

      data.split("\n").forEach((line: string) => {
        if (line.trim() && line.trim() !== "done") {
          try {
            const parsedLine = JSON.parse(line.replace("data: ", ""));
            if (parsedLine.choices && parsedLine.choices[0].delta.content) {
              completeMessage += parsedLine.choices[0].delta.content;
            }
          } catch (parseError) {
            console.error("Error parsing line:", parseError);
          }
        }
      });

      const assistantMessage: MessageType = {
        message: completeMessage,
        sender: "ChatGPT",
        direction: "incoming",
        position: "single",
      };
      setMessages([...messages, newMessage, assistantMessage]);
    } catch (error) {
      console.error("Error sending message to ChatGPT:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <MainContainer>
      <ChatContainer>
        <ConversationHeader>
          <Avatar src={user.imageUrl || "https://img.icons8.com/?size=100&id=42384&format=png&color=000000"} />
          <ConversationHeader.Content userName={user.fullName || "User"} />
          <ConversationHeader.Actions>
            <CollapsBtn onClick={onToggle} />
          </ConversationHeader.Actions>
        </ConversationHeader>

        <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing..." /> : null}>
          {messages.map((message, i) => (
            <Message key={i} model={{ message: message.message, direction: message.direction, position: message.position }} />
          ))}
        </MessageList>

        <MessageInput placeholder="Type message here" onSend={handleSend} />
      </ChatContainer>
    </MainContainer>
  );
};

export default ChatBotContainer;
