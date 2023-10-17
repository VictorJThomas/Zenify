import {ChatWindow} from '@/components/ChatWindow'

export default function ChatBotPage() {
    const InfoCard = (
      <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden">
        <h1 className="text-3xl md:text-4xl mb-4">
          ▲ Next.js + LangChain.js 🦜 Por que a vitol le dio la gana el langChain🔗
        </h1>
  
      </div>
    );
    return (
      <ChatWindow
        endpoint="api/chat"
        emoji="🏴‍☠️"
        titleText="Patchy the Chatty Pirate"
        placeholder="De que quiere hablar Miop?"
        emptyStateComponent={InfoCard}
      ></ChatWindow>
    );
  }