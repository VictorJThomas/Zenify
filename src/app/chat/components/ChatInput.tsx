"use client";

import axios from "axios";
import { FC, SetStateAction, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "./Button";

interface ChatInputProps {
  chatPartner: User;
  chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);

    try {
      await axios.post("/api/message/send", { text: input, chatId });
      setInput("");
      textareaRef.current?.focus();
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4 py-4 sm:mb-0">
      <div className="relative flex-2 overflow-hidden rounded-lg shadow-sm ring-1 h-20 py-auto ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <textarea
          ref={textareaRef}
          onKeyDown={(e: {
            key: string;
            shiftKey: any;
            preventDefault: () => void;
          }) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          // rows={1}
          value={input}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setInput(e.target.value)
          }
          placeholder={`Escribele a ${chatPartner.name}`}
          className="block w-full resize-none bg-transparent pl-2 pr-20 text-gray-900 h-full placeholder:text-gray-400 sm:py-1.5 sm:text-sm"
        />

        {/* <div
          onClick={() => textareaRef.current?.focus()}
          className="py-2"
          aria-hidden="true"
        >
          <div className="py-px">
            <div className="h-9" >
              Hola
            </div>
          </div>
        </div> */}

        <div className="absolute right-0  bottom-0 flex justify-between pb-5 pl-3 pr-2">
          <div className="flex-shrin-0 rounded-md bg-indigo-600 ml-2">
            <Button isLoading={isLoading} onClick={sendMessage} className="default" type="submit">
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
