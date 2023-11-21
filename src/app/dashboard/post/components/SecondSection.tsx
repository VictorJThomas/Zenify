import Card from "./Card";

const SecondSection = () => {
  return (
    <section className="">      
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <h4 className="bg-[#4781EB] py-2 px-5 text-wh-900 text-sm font-bold">
          TRAVEL
        </h4>
        <p className="font-bold text-2xl">New Travel Experiences</p>
      </div>

      {/* CARDS ROW */}
      <div className="sm:flex justify-between gap-8">
        <Card className="bg-[#4781EB] basis-1/3 mt-5 sm:mt-0" imageHeight="h-80" />
        <Card className="bg-[#4781EB] basis-1/3 mt-5 sm:mt-0" imageHeight="h-80" />
        <Card className="bg-[#4781EB] basis-1/3 mt-5 sm:mt-0" imageHeight="h-80" />
      </div>
      <Card
        className="bg-[#4781EB] sm:flex justify-between items-center gap-3 mt-7 mb-5"
        imageHeight="h-80"
      />
    </section>
  );
};

export default SecondSection;
