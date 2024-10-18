import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Avatar, MainContainer, MessageList, MessageInput, TypingIndicator, ChatContainer, ConversationHeader, Message } from "@chatscope/chat-ui-kit-react";
const HTTP="http://localhost:5000"
// Get API key from Vite environment variables
 
 


interface MessageType {
  message: string;
  sentTime?: string;
  sender: string;
  direction: "incoming" | "outgoing";
  position: "single" | "first" | "last" | "normal"; // Ensure 'position' is required
}

const Chat = () => {
 
  console.log(import.meta.env.VITE_OPENAI_API_KEY);
  const { user } = useUser();
  const [messages, setMessages] = useState<MessageType[]>([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
      direction: "incoming",
      position: "single", // Add initial position
    }
  ]);

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSend = async (message: string) => {
    const newMessage: MessageType = {
      message,
      direction: 'outgoing',
      sender: "user",
      position: "single" // Assign appropriate position here
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  const processMessageToChatGPT = async (chatMessages: MessageType[]) => {
    const systemMessage = {
      role: "system",
      content: "You are ChatGPT, a helpful assistant."
    };

    const apiMessages = chatMessages.map((messageObject) => ({
      role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
      content: messageObject.message,
    }));

    const apiRequestBody = {
      model: "gpt-4",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // Vite-specific syntax
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (data.choices && data.choices[0] && data.choices[0].message) {
        const assistantMessage: MessageType = {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
          direction: "incoming",
          position: "single", // Assign position
        };
        setMessages([...chatMessages, assistantMessage]);
      } else {
        console.error("Unexpected API response format:", data);
      }
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
          <Avatar src={user?.imageUrl || ""} />
          <ConversationHeader.Content userName={user?.fullName || "User"} />
        </ConversationHeader>

        <MessageList 
          scrollBehavior="smooth" 
          typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing..." /> : null}
        >
          {messages.map((message, i) => (
            <Message key={i} model={{ message: message.message, direction: message.direction, position: message.position }} />
          ))}
        </MessageList>

        <MessageInput placeholder="Type message here" onSend={handleSend} />   
      </ChatContainer>
    </MainContainer>
  );
};

export default Chat;
