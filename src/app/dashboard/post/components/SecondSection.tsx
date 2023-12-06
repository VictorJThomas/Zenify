import { Post } from "@prisma/client";
import Card from "./Card";
import QuoteCard from "./QuoteCard";

type MainSectionProps = {
  className?: string;
  posts: Post[];
};

const SecondSection = ({ className, posts }: MainSectionProps) => {
  const quotes = [
    {
      text: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
      author: "Helen Keller",
    },
    {
      text: "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle Onassis",
    },
    {
      text: "Whoever is happy will make others happy too.",
      author: "Anne Frank",
    },
    {
      text: "Do not go gentle into that good night. Rage, rage against the dying of the light.",
      author: "Dylan Thomas",
    },
    {
      text: "The difference between ordinary and extraordinary is that little extra.",
      author: "Jimmy Johnson",
    },
  ];

  return (
    <section>
      <div className="sm:flex custon-scroll-container justify-between gap-8">
        <Card
          post={posts[3]}
          className="sm:flex basis-2/3 justify-between items-center gap-3 mt-7 bg-opacity-80 mb-5"
          imageHeight="h-80"
        />
        <QuoteCard
          quotes={quotes}
          className="basis-1/3 p-10 m-4 text-white bg-[#AF695C]"
        />
      </div>
      <div className="sm:flex justify-between gap-8">
        <Card
          post={posts[0]}
          className="basis-1/3 mt-5 sm:mt-0 p-8"
          imageHeight="h-80"
        />
        <Card
          post={posts[1]}
          className="basis-1/3 mt-5 sm:mt-0 p-8"
          imageHeight="h-80"
        />
        <Card
          post={posts[2]}
          className="basis-1/3 mt-5 sm:mt-0 p-8"
          imageHeight="h-80"
        />
      </div>
    </section>
  );
};

export default SecondSection;
