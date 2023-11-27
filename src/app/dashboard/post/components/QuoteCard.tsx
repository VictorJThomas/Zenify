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
      <div className="">
        {quote && (
          <>
            <blockquote>
              <p>{quote.text}</p>
              <footer>{quote.author}</footer>
            </blockquote>
          </>
        )}
      </div>
    </div>
  );
};

export default QuoteCard;
