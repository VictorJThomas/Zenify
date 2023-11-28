"use client"

import { useEffect, useState } from "react";

type QuoteProps = {
  className?: string;
  quotes: {
    text: string;
    author: string;
  }[];
};



const QuoteCard = ({ className, quotes }: QuoteProps) => {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(
    null
  );

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, [quotes]);

  return (
    <div className={className}>
      <div className="pt-20">
        {quote && (
          <>
            <blockquote>
              <p className="text-xl font-semibold">{quote.text}</p>
              <footer className="text-lg">{quote.author}</footer>
            </blockquote>
          </>
        )}
      </div>
    </div>
  );
};

export default QuoteCard;
