import { prisma } from "@/utils/prisma";
import MainSection from "./components/MainSection";
import SecondSection from "./components/SecondSection";
import Tags from "./components/Tags";
import { Post } from "@prisma/client";
import { getUserId } from "@/actions/getUserId";

export const revalidate = 60;

const getPosts = async () => {
  const id = await getUserId()

  const moodFound = await prisma.mood.findFirst({
    where: {
      userId: id
    },
    orderBy: {
      createAt: 'desc'
    }
  })

  const mood = moodFound?.mood

  const posts: Array<Post> = await prisma.post.findMany({
    where: {
      category: mood
    }
  })
  prisma.$disconnect
  return posts
}

const PostPage = async () => {
  const posts = await getPosts();
  return (
    <div className="w-full px-10 max-h-[50%]">
      <h1 className="text-6xl">Welcome!</h1>
      <Tags />
      <SecondSection posts={posts} />
    
    </div>
  );
};

export default PostPage;
