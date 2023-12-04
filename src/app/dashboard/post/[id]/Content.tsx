import { FormattedPost } from "@/types";
import Image from "next/image";
import Article from "./Article";

type Props = {
  post: FormattedPost;
};

const Content = ({ post }: Props) => {
  const date = new Date(post?.createAt);
  const options = { year: "numeric", month: "long", day: "numeric" } as any;
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className="prose w-full max-w-full mb-10 custom-scroll-container">
      <h5 className="dark:text-gray-100">{`Home > ${post.category} > ${post.title}`}</h5>
      <div className="flex gap-3">
        <h5 className="font-semibold text-xs dark:text-gray-100">By {post.author}</h5>
        <h6 className="dark:text-gray-200 text-xs">{formattedDate}</h6>
      </div>
      <div className="relative w-auto mt-2 mb-12 h-[600px]">
        <Image
            fill
            alt={post.title}
            src={post.image}
            priority
            sizes="(max-width: 480px) 100vw,
                  (max-width: 768px) 85vw,
                  (max-width: 1060px) 75vw,
                  60vw"
            style={{ objectFit: "contain" }}
          />
      </div>
      <Article content={post.content} />
    </div>
  );
};

export default Content;
