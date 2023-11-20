import Card from "./Card";

const FirstSection = () => {
  return (
    <section>
      <hr className="border-1" />
      <div className="flex items-center gap-3 my-8">
        <h4 className="bg-sky-600 py-2 px-5 text-wh-900 text-sm font-bold">
        NEW
        </h4>
        <p className="font-bold text-2xl">First Section</p>
      </div>
      <div className="flex justify-between items-center gap-5">
        <div className="bg-[#4781EB] h-96 basis-2/4"></div>
        <div className="flex flex-col gap-3 h-96 basis-2/4">
          <div className="bg-[#4781EB] basis-1/3"></div>
          <div className="bg-[#4781EB] basis-1/3"></div>
          <div className="bg-[#4781EB] basis-1/3"></div>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
