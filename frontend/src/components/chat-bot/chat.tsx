import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import styled from "styled-components";
import { Avatar, MainContainer, MessageList, MessageInput, TypingIndicator, ChatContainer, ConversationHeader, Message } from "@chatscope/chat-ui-kit-react";

const HTTP = "http://localhost:4000";

interface MessageType {
  message: string;
  sentTime?: string;
  sender: string;
  direction: "incoming" | "outgoing";
  position: "single" | "first" | "last" | "normal";
}

interface ChatProps {
  onClose: () => void;
}

const CollapsBtn = styled.div`
  background-image: url("https://img.icons8.com/?size=50&id=11885&format=png&color=000000");
  width: 50px;
  height: 50px;
  position: relative;
  top: 0;
  right: 0;
  z-index:100;
  cursor: pointer;
   background-color: rgba(255, 255, 255, 0.7);
`;

const Chat = ({ onClose }: ChatProps) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<MessageType[]>([
    {
      message: `Hello ${user?.fullName || "User"}, I'm ChatGPT! Ask me anything!`,
      sentTime: "just now",
      sender: "ChatGPT",
      direction: "incoming",
      position: "single",
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSend = async (message: string) => {
    const newMessage: MessageType = {
      message,
      direction: 'outgoing',
      sender: "user",
      position: "single"
    };
    setMessages([...messages, newMessage]);

    setIsTyping(true);
    try {
      const response = await fetch(`${HTTP}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message to ChatGPT");
      }

      const data = await response.json();

      if (data.choices && data.choices[0] && data.choices[0].message) {
        const assistantMessage: MessageType = {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
          direction: "incoming",
          position: "single",
        };
        setMessages([...messages, newMessage, assistantMessage]);
      }
    } catch (error) {
      console.error("Error sending message to ChatGPT:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-container">
      <MainContainer>
        <ChatContainer>
          <ConversationHeader>
            <Avatar src={user?.imageUrl || "https://img.icons8.com/?size=100&id=42384&format=png&color=000000"} />
            <ConversationHeader.Content userName={user?.fullName || "User"} />
            <ConversationHeader.Actions>
              <CollapsBtn onClick={onClose} />
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
    </div>
  );
};

export default Chat;
