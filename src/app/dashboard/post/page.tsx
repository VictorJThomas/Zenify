import MainSection from "./components/MainSection";
import SecondSection from "./components/SecondSection";
import Tags from "./components/Tags";

const PostPage = () => {
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
