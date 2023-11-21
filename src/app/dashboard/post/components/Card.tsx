import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  className?: string;
  imageHeight: string;
  isSmallCard?: boolean;
  isLongForm?: boolean;
};

const Card = ({
  className,
  imageHeight,
  isSmallCard = false,
  isLongForm = false,
}: Props) => {
;
  const options = { year: "numeric", month: "long", day: "numeric" } as any;

  return (
    <div className={className}>
      <Link
        className="basis-full hover:opacity-70"
        href="/dashboard/post"
      >
        <div className={`relative w-auto mb-3 ${imageHeight}`}>
          image
          {/* <Image
            fill
            alt="tech"
            placeholder="blur"
            src={image}
            sizes="(max-width: 480px) 100vw,
                  (max-width: 768px) 75vw,
                  (max-width: 1060px) 50vw,
                  33vw"
            style={{ objectFit: "cover" }}
          /> */}
        </div>
      </Link>
      <div className="basis-full">
        <Link href="/dashboard/post">
          <h4
            className={`font-bold hover:text-green-700
            ${isSmallCard ? "text-base" : "text-lg"}
            ${isSmallCard ? "line-clamp-2" : ""}
          `}
          >
            Title
          </h4>
        </Link>

        <div className={`${isSmallCard ? "my-3" : "flex my-4"} gap-3`}>
          <h5 className="font-semibold text-xs">Author</h5>
          <h6 className="text-wh-300 text-xs">Date</h6>
        </div>
        <p
          className={`text-wh-500 ${
            isLongForm ? "line-clamp-5" : "line-clamp-3"
          }`}
        >
          Snippet
        </p>
      </div>
    </div>
  );
};

export default Card;