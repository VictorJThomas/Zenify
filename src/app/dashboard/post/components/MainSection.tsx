import Card from "./Card";

const MainSection = () => {
  return (
    <div className="sm:grid grid-cols-5 grid-rows-3 gap-x-8 gap-y-8 h-[700px] mt-8">
      <Card
        imageHeight="h-48"
        isSmallCard
        className="bg-[#4781EB] col-span-1 row-span-1 flex justify-between gap-3 mt-2 sm:mt-0 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
      />
      <Card
        imageHeight="h-96"
        isLongForm
        className="bg-[#4781EB] col-span-3 row-span-2 flex justify-between gap-3 mt-2 sm:mt-0 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
      />
      <Card
        imageHeight="h-48"
        isSmallCard
        className="bg-[#4781EB] col-span-1 row-span-1 flex justify-between gap-3 mt-2 sm:mt-0 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
      />
      <Card
        imageHeight="h-48"
        isSmallCard
        className="bg-[#4781EB] col-span-1 row-span-1 flex justify-between gap-3 mt-2 sm:mt-0 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
      />
      <Card
        imageHeight="h-48"
        isSmallCard
        className="bg-[#4781EB] col-span-1 row-span-1 flex justify-between gap-3 mt-2 sm:mt-0 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
      />
    </div>
  );
};

export default MainSection;
