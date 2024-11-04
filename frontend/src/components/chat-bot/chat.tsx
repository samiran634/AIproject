import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import styled from "styled-components";
import { Avatar, MainContainer, MessageList, MessageInput, TypingIndicator, ChatContainer, ConversationHeader, Message } from "@chatscope/chat-ui-kit-react";

 

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
      const response = await fetch("https://api.vultrinference.com/v1/chat/completions", {
        method: 'POST',
        headers: {
          'Authorization': "Bearer Y4EO6EF6XN5YC2IAEERWB3VKHXA42UOT33QA",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "zephyr-7b-beta-Q5_K_M",
          messages: [
            {
              role: "user",
              content: message
            }
          ],
          max_tokens: 512,
          seed: -1,
          temperature: 0.8,
          top_k: 40,
          top_p: 0.9,
          stream: true
        })
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let result = "";

      const processText = async ({ done, value }: ReadableStreamReadResult<Uint8Array>): Promise<void> => {
        if (done) {
          setIsTyping(false);
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonString = line.substring(6).trim();

            if (jsonString === "[DONE]") {
              setIsTyping(false);
              return;
            }

            if (jsonString) {
              try {
                const data = JSON.parse(jsonString);
                if (data.choices && data.choices[0] && data.choices[0].message) {
                  const assistantMessage: MessageType = {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT",
                    direction: "incoming",
                    position: "single",
                  };
                  setMessages(prevMessages => [...prevMessages, assistantMessage]);
                }
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            }
          }
        }

        if (reader) {
          await reader.read().then(processText);
        } else {
          setIsTyping(false);
          console.error("Reader is undefined.");
        }
      };

      await reader?.read().then(processText);
    } catch (error) {
      console.error("Error sending message to ChatGPT:", error);
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
