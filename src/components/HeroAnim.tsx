"use client";

import { Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LottiePlayer from "@/components/LottiePlayer";

type Props = {
  lottieSrc?: string;
  speed?: number;
};

export default function HeroAnim({ lottieSrc = "/animations/chain.json", speed = 0.8 }: Props) {
  // Parallaxe très léger sur le halo (déplacement, scale, opacité)
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 36]);       // déplacement vertical doux
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]); // zoom subtil
  const opacity = useTransform(scrollYProgress, [0, 1], [0.32, 0.20]);

  return (
    <div className="relative h-72 md:h-[22rem] flex items-center justify-center isolate overflow-visible">
      {/* Halo radial avec parallaxe */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ y, scale, opacity }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%]"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 50%, rgba(255,126,0,0.32) 0%, rgba(255,126,0,0.18) 40%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Lottie centrée */}
      <Suspense>
        <LottiePlayer
          src={lottieSrc}
          loop
          speed={speed}
          playOnView
          threshold={0.4}
          className="relative z-10 max-h-[65%] md:max-h-[80%] w-auto"
        />
      </Suspense>
    </div>
  );
}