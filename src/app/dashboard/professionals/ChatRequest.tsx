import { addFriendValidator } from "@/utils/validations/add-friend";
import axios from "axios";
import { FC } from "react";

interface ChatRequestProps {
    email: string | null;
}

const ChatRequest: FC<ChatRequestProps> = ({ email }) => {
  const chatRequest = async () => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });
      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });
    console.log(validatedEmail)
    } catch (error) {
      console.log("Chat Request Error:", error);
    }
  };

  return (
    <div className="h-7 w-7 text-zinc-400 hover:bg-indigo-300">
      <button onClick={chatRequest}>+</button>
    </div>
  );
};

export default ChatRequest;
