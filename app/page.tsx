import { Hero } from "@/components/hero";
import { Highlights } from "@/components/highlights";
import { Navbar } from "@/components/navbar";
import { Models } from "@/components/model";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Navbar />
          <Hero />
          <Highlights />
          <Models />
        </div>
      </div>
    </main>
  );
}
