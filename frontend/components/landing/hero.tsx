"use client";

import { motion } from "framer-motion";
import WaveMesh from "./wave-mesh";
import Link from "next/link";

export default function Hero() {
  return (
    <div
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <WaveMesh />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-700">
                GroderAI
              </span>
              <br />
              <span className="text-white">Revolutionize code grading.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-8"
          >
            GroderAI analyzes and summarizes code to augment grading, saving
            time and improving consistency for educators and coding instructors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/analyze">
              <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-700 text-white rounded-full font-medium hover:opacity-90 transition-opacity">
                Live Demo
              </button>
            </Link>
            <Link href="#how-it-works">
              <button className="px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors">
                Learn More
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
