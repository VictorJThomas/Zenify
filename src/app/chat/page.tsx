"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "react-feather";
import axios from "axios";
import { Message } from "@/types";
import { useSession } from "next-auth/react";

const ChatPage = () => {
  const { data: session } = useSession();
  const user = session?.user

  const [message, setMessage] = useState<string>("");
  const [history, setHistory] = useState<Message[]>([]);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

    setHistory((prevHistory) => [
      ...prevHistory, response
    ]);

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

  useEffect(() => {
    const initialMessage = "Hello! How can I assist you today?";
    setHistory([{ role: "assistant", content: initialMessage }]);
  }, []);

  return (
    <main className="h-screen bg-white p-6 flex flex-col">
      <div className="flex flex-col gap-8 w-full items-center flex-grow max-h-full">
        <h1 className="text-4xl text-transparent font-extralight bg-clip-text bg-gradient-to-r from-[#4F80CF] to-[#70160A]">
          ChatBot
        </h1>
        <form
          className="rounded-2xl border-purple-700 border-opacity-5 border lg:w-3/4 flex-grow flex flex-col bg-[url('/images/bg.png')] bg-cover max-h-full overflow-clip"
          onSubmit={(e) => {
            e.preventDefault();
            handleUserMessage();
          }}
        >
          <div className="overflow-y-scroll flex flex-col gap-5 p-10 h-full">
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
                    <p className="text-sm font-medium text-[#3B71CA] mb-2">
                      {message.role === "user" ? "You" : "AI Assistant"}
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
          {/* Input area */}
          <div className="flex sticky bottom-0 w-full px-6 pb-6 h-24">
            <div className="w-full relative">
              <textarea
                aria-label="chat input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="w-full h-full overflow-hidden rounded-full border border-slate-900/10 bg-white pl-6 pr-24 py-[25px] text-base placeholder:text-slate-400 focus:border-[#3B71CA] focus:outline-none focus:ring-4 focus:ring-[#3B71CA]/10 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
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
                className="flex w-14 h-14 items-center justify-center rounded-full px-3 text-sm bg-[#3B71CA] font-semibold text-white hover:bg-[#3B71CA]  active:bg-[#3F74CA] absolute right-2 bottom-2 disabled:bg-[#B6CDF7] disabled:text-[#488DDA]"
                type="submit"
                aria-label="Send"
                disabled={!message || loading}
              >
                <Send />
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ChatPage;
