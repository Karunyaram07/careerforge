"use client";

import Image from "next/image";
import { useRef } from "react";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function HeroBanner() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [0.8, 1]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    [20, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [150, 0]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [0.3, 1]
  );

  return (
    <section
      ref={ref}
      className="relative py-32 px-6"
    >
      <motion.div
        style={{
          scale,
          rotateX,
          y,
          opacity,
        }}
        className="mx-auto max-w-6xl"
      >
        <Image
          src="/banner.jpeg"
          width={1280}
          height={720}
          alt="SensAI Dashboard"
          priority
          className="
            mx-auto
            rounded-3xl
            border
            border-white/10
            shadow-[0_0_100px_rgba(59,130,246,0.20)]
          "
        />
      </motion.div>
    </section>
  );
}


