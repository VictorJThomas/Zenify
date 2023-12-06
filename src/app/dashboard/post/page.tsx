import { Post } from "@prisma/client";
import SecondSection from "./components/SecondSection";
import Tags from "./components/Tags";
import { getUserId } from "@/actions/getUserId";
import { prisma } from "@/utils/prisma";

export const revalidate = 60;

const getPosts = async () => {
  const id = await getUserId();

  const moodFound = await prisma.mood.findFirst({
    where: {
      userId: id,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  const mood = moodFound?.mood;

  const posts: Array<Post> = await prisma.post.findMany({
    where: {
      category: mood,
    },
  });
  await prisma.$disconnect;
  return {posts, mood};
};

const PostPage = async () => {
  const {posts, mood} = await getPosts();
  const moods = [
    { mood: "Depression", value: "depression" },
    { mood: "Loneliness", value: "loneliness" },
    { mood: "Happiness", value: "happiness" },
    { mood: "Anxiety", value: "anxiety" },
    { mood: "Rage", value: "rage" },
    { mood: "Sadness", value: "sadness" },
  ];

  return (
    <div className="w-full overflow-y-auto px-10 max-h-[60rem]">
      <h1 className="text-6xl">Welcome!</h1>
      <Tags moods={moods} selectedMood={mood}/>
      <SecondSection posts={posts} />
    </div>
  );
};

export default PostPage;
