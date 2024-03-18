import Image from "next/image";
import Right from "../icons/Right";

interface HeroProps {}
const Hero: React.FC<HeroProps> = (props) => {
  return (
    <>
      <section className="hero mt-4">
        <div className="py-12">
          <h1 className="text 4xl font-semibold leading-normal">
            Welcome to <span className="text-primary">Closet Carousel</span>
          </h1>
          <p className="my-6 text-gray-500 text-sm">
            Redefining fashion with our curated collection.
          </p>
          <div className="flex gap-4 text-sm">
            <button className="bg-primary text-white px-4 py-2 rounded-full items-center flex gap-2">
              Join now
              <Right />
            </button>
            <button className="flex items-center gap-2 py-2 text-gray-600 font-semibold">
              Learn more
              <Right />
            </button>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/boutique-store.jpg"
            alt="boutique"
            layout={"fill"}
            objectFit={"contain"}
          />
        </div>
      </section>
    </>
  );
};
export default Hero;
