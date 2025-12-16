import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { VideoIntro } from "@/components/sections/VideoIntro";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { Materials } from "@/components/sections/Materials";
import { Forms } from "@/components/sections/Forms";
import { Passers } from "@/components/sections/Passers";
import { Contact } from "@/components/sections/Contact";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <VideoIntro />
        <About />
        <Team />
        <Materials />
        <Forms />
        <Passers />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
