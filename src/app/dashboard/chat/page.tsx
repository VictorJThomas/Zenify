"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "react-feather";
import axios from "axios";
import { Message } from "@/types";
import { useSession } from "next-auth/react";
import { MdOutlineThumbDownAlt, MdThumbUpOffAlt  } from "react-icons/md";

const ChatPage = () => {
  const { data: session } = useSession();
  const user = session?.user

  const [message, setMessage] = useState<string>("");
  const [history, setHistory] = useState<Message[]>([]);
  const [diagnosed, setDiagnosed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleUserMessage = async () => {
    if (message === "") return;

    setHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", content: message },
    ]);

    setLoading(true);
    const response = await sendMessage(message);
    setLoading(false);

    setHistory((prevHistory) => [...prevHistory, response]);

    if(response.role === "assistant" && response.content.diagnose){
      setDiagnosed(true)
    }

    setMessage("");

    scrollToBottom();
  };

  const sendMessage = async (userMessage: string) => {
    try {
      const response = await axios.post("/api/chat", {
        userMessage: userMessage,
        user: user
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
        const response = await sendMessage("diagnose") 
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
    <div className="h-full flex flex-col">
      <div className="flex flex-col gap-8 w-full items-center flex-grow max-h-full">
        <h1 className="text-4xl text-black dark:white font-semibold bg-clip-text">
          ZenBot
        </h1>
        <form
          className="bg-slate-100 bg-opacity-30 rounded-2xl border-[#28231E] border-opacity-5 border lg:w-3/4 flex-grow flex flex-col bg-cover max-h-full overflow-clip"
          onSubmit={(e) => {
            e.preventDefault();
            handleUserMessage();
          }}
        >
          <div className="overflow-y-visible flex flex-col gap-5 p-10 h-full">
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
                    className={`w-auto max-w-xl break-words bg-white rounded-b-xl rounded-tl-xl text-black p-6 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)] ${
                      message.role === "user"
                        ? "self-end"
                        : "rounded-tr-xl rounded-b-xl"
                    }`}
                  >
                    <p className="text-sm font-medium text-[#28231E] mb-2">
                      {message.role === "user" ? "You" : "ZenBot AI Assistant"}
                    </p>
                    {typeof message.content === "string" ? (
                      message.content 
                    ) : (
                      <>
                        <p>Mood: {message.content.mood}</p>
                        <p>Advice: {message.content.advice}</p>
                        {/* Render thumbs up and thumbs down buttons if diagnosed */}
                        {diagnosed && (
                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={() => handleThumbClick(true)}
                              className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none"
                            >
                              <MdThumbUpOffAlt />
                            </button>
                            <button
                              onClick={() => handleThumbClick(false)}
                              className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
                            >
                              <MdOutlineThumbDownAlt />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Input area */}
          <div className="flex sticky bottom-0 w-full px-6 pb-6 h-24">
            <div className="w-full relative">
              <textarea
                aria-label="chat input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  diagnosed
                    ? "You've received a diagnosis. Click thumbs up or down."
                    : "Type a message"
                }
                className="w-full h-full overflow-hidden rounded-3xl border text-black border-slate-900/10 bg-white pl-6 pr-24 py-[25px] text-base placeholder:text-orange-950 focus:border-[#28231E] focus:outline-none focus:ring-4 focus:ring-[#28231E]/10 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleUserMessage();
                  }
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleUserMessage();
                }}
                className={`flex w-14 h-14 items-center justify-center rounded-full px-3 text-sm bg-[#28231E] font-semibold text-white hover:bg-[#28231E]  active:bg-[#28231E] absolute right-2 bottom-2 disabled:bg-[#B55B40] disabled:text-white ${
                  diagnosed ? "cursor-not-allowed" : ""
                }`}
                type="submit"
                aria-label="Send"
                disabled={!message || loading || diagnosed}
              >
                <Send />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
