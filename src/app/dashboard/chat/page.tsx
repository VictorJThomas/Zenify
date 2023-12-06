"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "react-feather";
import axios from "axios";
import { Message } from "@/types";
import { useSession } from "next-auth/react";
import { MdOutlineThumbDownAlt, MdThumbUpOffAlt } from "react-icons/md";
import Button from "@/app/chat/components/Button";

const ChatPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [message, setMessage] = useState<string>("");
  const [history, setHistory] = useState<Message[]>([]);
  const [diagnosed, setDiagnosed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [charCount, setCharCount] = useState<number>(0);

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleUserMessage = async () => {
    if (message === "" || charCount === 350) return;

    setHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", content: message },
    ]);

    setLoading(true);
    const response = await sendMessage(message);
    setLoading(false);

    setHistory((prevHistory) => [...prevHistory, response]);

    if (response.role === "assistant" && response.content.diagnose) {
      setDiagnosed(true);
    }

    setMessage("");

    scrollToBottom();
  };

  const sendMessage = async (userMessage: string) => {
    try {
      const response = await axios.post("/api/chat", {
        userMessage: userMessage,
        user: user,
      });
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      return { role: "assistant", content: "An error occurred." };
    }
  };

  const handleThumbClick = async (accept: boolean) => {
    if (accept) {
      try {
        const response = await sendMessage("diagnose");
        const { mood, advice } = response.content;

        const adviceMessage: Message = {
          role: "assistant",
          content: {
            mood: mood,
            advice: advice,
          },
        };

        setHistory((prevHistory) => [...prevHistory, adviceMessage]);
      } catch (error) {
        console.error("Error getting diagnosis:", error);
      }
    } else {
      setDiagnosed(false);
    }
  };

  useEffect(() => {
    const initialMessage = "Hello! How can I assist you today?";
    setHistory([{ role: "assistant", content: initialMessage }]);
  }, []);

  return (
    <div className="flex-1 pr-20 justify-between flex-col">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <div className="relative w-8 sm:w-12 h-8 sm:h-12">
              {/* <Image
                  fill
                  referrerPolicy='no-referrer'
                  src={chatPartner.picture || imageDefaultUser}
                  alt={`${chatPartner.name} profile picture`}
                  className='rounded-full'
                /> */}
            </div>
          </div>

          <div className="flex flex-col leading-tight">
            <div className="text-xl flex items-center">
              <span className="text-gray-700 mr-3  font-semibold">ZenBot</span>
            </div>

            {/* <span className='text-sm text-gray-600'>{chatPartner.email}</span> */}
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUserMessage();
        }}
      >
        <div className="overflow-y-hidden bg-scroll h-[47rem]">
          <div className="flex h-full flex-1 flex-col gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            {history.map((message: Message, idx) => {
              const isLastMessage = idx === history.length - 1;
              return (
                <div
                  key={idx}
                  ref={isLastMessage ? lastMessageRef : null}
                  className={`flex gap-2 ${
                    message.role === "user" ? "self-end" : ""
                  }`}
                >
                  <div
                    className={`w-auto text-base max-w-xl break-words rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "self-end bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <p className={`text-xs font-semibold ${message.role === "user"  ? "text-white" : "text-black"}  mb-2`}>
                      {message.role === "user" ? "You" : "ZenBot AI Assistant"}
                    </p>
                    {typeof message.content === "string" ? (
                      message.content
                    ) : (
                      <>
                        <p>Mood: {message.content.mood}</p>
                        <p>Advice: {message.content.advice}</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Input area */}
        <div className="h-18">
          <div className="border-t border-gray-200 pt-4 py-4 sm:mb-0">
            <div className="relative flex-2 overflow-hidden rounded-lg shadow-sm ring-1 h-20 py-auto ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
              <textarea
                aria-label="chat input"
                value={message}
                onChange={(e) => {
                  const inputText = e.target.value;
                  if (inputText.length <= 350) {
                    setMessage(inputText);
                    setCharCount(inputText.length);
                  }
                }}
                placeholder={
                  diagnosed
                    ? "You've received a diagnosis. Click thumbs up or down."
                    : "Type a message"
                }
                className="block w-full resize-none bg-transparent pl-2 pr-20 text-gray-900 h-full placeholder:text-gray-400 sm:py-1.5 sm:text-sm "
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleUserMessage();
                  }
                }}
                disabled={charCount === 350}
              />
              <div className="absolute right-0  bottom-0 flex justify-between pb-5 pl-3 pr-2">
                <div className="flex-shrink-0 rounded-md bg-indigo-600 ml-2">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleUserMessage();
                    }}
                    type="submit"
                    aria-label="Send"
                    disabled={!message || loading || diagnosed}
                  >
                    Enviar
                  </Button>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {`${charCount} de 350 caracteres`}
            </div>
            {charCount === 350 && (
              <div className="text-xs text-red-500 mt-1">
                Maximum characters reached
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
