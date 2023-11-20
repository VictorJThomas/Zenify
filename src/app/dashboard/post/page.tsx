import FirstSection from "./components/FirstSection";
import MainComponent from "./components/MainComponent";
import MessageComponent from "./components/MessageComponent";
import SecondSection from "./components/SecondSection";
import Subscribe from "./components/Subscribe";
import TopComponent from "./components/TopComponent";

const PostPage = () => {
  return (
    <div className="w-full px-10 m-x max-h-[50%]">
      <h1 className="text-6xl">Welcome!</h1>
      <div className="p-4 py-10 flex gap-3">
        <button className="ring-2 p-2 text-xs rounded-full ring-yellow-950">
          Happiness
        </button>
        <button className="ring-2 p-2 text-xs rounded-full ring-yellow-950">
          Anxiety
        </button>
        <button className="ring-2 p-2 text-xs rounded-full ring-yellow-950">
          Sadness
        </button>
        <button className="ring-2 p-2 text-xs rounded-full ring-yellow-950">
          Rage
        </button>
        <button className="ring-2 p-2 text-xs rounded-full ring-yellow-950">
          Depression
        </button>
        <button className="ring-2 p-2 text-xs rounded-full ring-yellow-950">
          Loneliness
        </button>
      </div>
      <div className="grid grid-cols-5 grid-rows-4 gap-x-5 gap-y-3  my-5">
        <div className="bg-[#4781EB] col-span-1 row-span-1 h-96">1</div>
        <div className="bg-[#4781EB] col-span-3 row-span-2 ">2</div>
        <div className="bg-[#4781EB] col-span-1 row-span-1 h-60">3</div>
        <div className="bg-[#4781EB] col-span-1 row-span-1 h-60">4</div>
        <div className="bg-[#4781EB] col-span-1 row-span-1 h-96">5</div>
      </div>
      <hr className="border-1" />
      <div className="flex items-center gap-3 my-8">
        <h4 className="bg-sky-600 py-2 px-5 text-wh-900 text-sm font-bold">
          NEW
        </h4>
        <p className="font-bold text-2xl">First Section</p>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-x-5 gap-y-3 h-96 my-5">
        <div className="bg-[#4781EB] col-span-1 row-span-2"></div>
        <div className="bg-[#4781EB] col-span-2 row-span-1"></div>
        <div className="bg-[#4781EB] col-span-1 row-span-1"></div>
        <div className="bg-[#4781EB] col-span-1 row-span-1"></div>
        <div className="bg-[#4781EB] col-span-1 row-span-1"></div>
      </div>
      <div className="">
        <div className="flex-start flex-col justify-between items-center gap-5">
          {/* <div className="flex flex-none gap-4 w-14 h-14 items-center">
            <div className="bg-[#4781EB]">Mucho texto</div>
            <div className="bg-[#4781EB]">Mucho texto</div>
          </div>
          <div className="grow flex justify-center items-center">
            <MessageComponent />
            <div className="flex flex-none gap-4 w-14 h-14 items-center">
              <div className="bg-[#4781EB]">Mucho texto</div>
              <div className="bg-[#4781EB]">Mucho texto</div>
            </div>
            <MainComponent />
          </div> */}
          <div className="md:flex gap-10 mb-5">
            <div className="basis-3/4">
              <FirstSection />
              {/* <SecondSection/>
            <SecondSection /> */}
              <div className="hidden md:block">{/* <Subscribe /> */}</div>
            </div>
            {/* <div className="basis-1/4">
            <Sidebar /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
