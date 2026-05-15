import { Header } from "@/components/header/header";
import { HeroSection } from "@/components/hero/hero-section";
import { Preloader } from "@/components/ui/preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main className="w-full flex flex-col">
        <HeroSection />
      </main>
    </>
  );
}