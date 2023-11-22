import { prisma } from "@/utils/prisma";
import MainSection from "./components/MainSection";
import SecondSection from "./components/SecondSection";
import Tags from "./components/Tags";
import { Post } from "@prisma/client";

const getPosts = async () => {
  const posts: Array<Post> = await prisma.post.findMany()

  return posts
}

const PostPage = async () => {
  const posts = await getPosts();

  const formatPosts = () => {
    
  }

  return (
    <div className="w-full px-10 max-h-[50%]">
      <h1 className="text-6xl">Welcome!</h1>
      <Tags />
      <MainSection/>
      <SecondSection />
    
    </div>
  );
};

export default PostPage;
