import { FormattedPost } from "@/types";
import { prisma } from "@/utils/prisma";
import { Post as PostType } from "@prisma/client";
import Content from "./Content";

type Props = {
  params: { id: string };
};

export const revalidate = 60;

const getPost = async (id: string) => {
  const post: PostType | null = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    console.log(`Post with id ${id} not found`);
    return null;
  }

  const formattedPost = {
    ...post,
    createAt: post.createAt?.toISOString(),
    updateAt: post.updateAt?.toISOString(),
  };

  return formattedPost;
};

const Post = async ({ params }: Props) => {
  const { id } = params;
  const post: FormattedPost | null = await getPost(id);
  
  if(!post){
    return <div>Post Not Found</div>
  }

  return (
    <div className="px-10 leadin-7">
        <Content post={post}/>
    </div>
  )
};

export default Post;
