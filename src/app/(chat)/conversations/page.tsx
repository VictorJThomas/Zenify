'use client';

import EmptyState from "@/components/(chat)/EmptyState";
import useConversation from "@/hooks/useConversation";
import clsx from "clsx";

const ConversationPage = () => {
    const { isOpen } = useConversation()

    return (
        <div className={clsx(
            'lg:pl-80 h-full lg:block',
            isOpen ? 'block' : 'hidden'
        )}>
            <EmptyState />
        </div>
    )
}

export default ConversationPage