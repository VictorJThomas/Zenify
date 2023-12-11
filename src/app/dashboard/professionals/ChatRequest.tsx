import { addFriendValidator } from "@/utils/validations/add-friend";
import axios from "axios";
import { FC } from "react";
import {MessageSquare} from 'lucide-react'

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
    <div className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
      <button onClick={chatRequest}><MessageSquare /></button>
    </div>
  );
};

export default ChatRequest;
