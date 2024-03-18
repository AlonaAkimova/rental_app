import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            perspiciatis rerum sunt unde ullam libero? Sapiente quia nostrum
            commodi. Voluptates id quae voluptatem voluptas blanditiis qui
            maxime? Est, hic? Nulla?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            perspiciatis rerum sunt unde ullam libero? Sapiente quia nostrum
            commodi. Voluptates id quae voluptatem voluptas blanditiis qui
            maxime? Est, hic? Nulla?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            perspiciatis rerum sunt unde ullam libero? Sapiente quia nostrum
            commodi.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a
            className="text 4xl underline text-gray-500"
            href="tel:+48222444555"
          >
            +48 222 444 555
          </a>
        </div>
      </section>
    </>
  );
}
