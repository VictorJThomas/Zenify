import { prisma } from "@/utils/prisma";
import { Post as PostType } from "@prisma/client";

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
  const post = await getPost(id);
  
  if(!post){
    return <div>Post Not Found</div>
  }

  return (
    <div className="px-10 leadin-7">
        <div className="md: flex gap-10 mb-5">
            <Content post={post}/>
        </div>
    </div>
  )
};

export default Post;
