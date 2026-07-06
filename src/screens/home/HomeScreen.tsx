import { Hero } from "@/src/components/home/Hero";
import { About } from "@/src/components/home/About";
import { Benefits } from "@/src/components/home/Benefits";
import { FeaturedProducts } from "@/src/components/home/FeaturedProducts";
import { Categories } from "@/src/components/home/Categories";
import { BestSellersAndRecent } from "@/src/components/home/BestSellersAndRecent";
import { Testimonials } from "@/src/components/home/Testimonials";
import { CallToAction } from "@/src/components/home/CallToAction";

export function HomeScreen() {
  return (
    <>
      <Hero />
      <About />
      <Benefits />
      <FeaturedProducts />
      <Categories />
      <BestSellersAndRecent />
      <Testimonials />
      <CallToAction />
    </>
  );
}
