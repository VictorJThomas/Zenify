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
      "text": "La salud mental es tan importante como la física. Ambas contribuyen al bienestar general de una persona.",
      "author": "Sigmund Freud"
    },
    {
      "text": "La felicidad no es la ausencia de problemas, sino la habilidad de lidiar con ellos.",
      "author": "Steve Maraboli"
    },
    {
      "text": "No hay salud sin salud mental.",
      "author": "David Satcher"
    },
    {
      "text": "La salud mental no es un destino, sino un viaje. La salud mental es algo que todos debemos cuidar.",
      "author": "Diane Abbott"
    },
    {
      "text": "Cuida de tu cuerpo. Es el único lugar que tienes para vivir.",
      "author": "Jim Rohn"
    }
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
