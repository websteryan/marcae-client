import NavBar from "@/components/navbar";
import Hero from "@/components/home/hero";
import Partners from "@/components/home/partners";
import Pricing from "@/components/home/pricing";
import Faq from "@/components/home/faq";
import Footer from "@/components/home/footer";
import Features from "@/components/home/features";


export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh">
      <NavBar />
      <Hero />
      <Partners />
      <Features/>
      <Pricing />
      <Faq />
      <Footer />
    </main>
  );
}
