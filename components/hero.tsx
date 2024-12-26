"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { heroVideo, smallHeroVideo } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

export const Hero = () => {
  const isDesktop = useMediaQuery("(min-width: 790px)");
  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, delay: 1.5 });
    gsap.to("#cta", { opacity: 1, y: -50, delay: 2 });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">
          iPhone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12">
          <video
            className="w-full"
            preload="none"
            key={isDesktop ? heroVideo : smallHeroVideo}
            playsInline
            autoPlay
            loop
            muted>
            <source
              src={isDesktop ? heroVideo : smallHeroVideo}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20">
        <Link href="#highlight" className="btn">
          Buy
        </Link>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};
