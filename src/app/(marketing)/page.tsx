import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";
import JournalPreview from "@/components/sections/JournalPreview";
import CTABands from "@/components/sections/CTABands";

export default function Page() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Projects />
      <Process />
      <Stats />
      <JournalPreview />
      <CTABands />
    </>
  );
}
