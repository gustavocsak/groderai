"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "../ui/separator";

export default function HowItWorks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const drawGlow = () => {
      // Main centered glow
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 4; // Positioned at the top quarter

      // Create multiple layered glows for stronger effect
      for (let i = 0; i < 3; i++) {
        const gradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          300 + i * 100,
        );

        // Pulsating opacity based on time
        const baseOpacity = 0.18 - i * 0.1;
        const pulseOpacity = baseOpacity + Math.sin(time * 0.002) * 0.1;

        gradient.addColorStop(0, `rgba(225, 29, 72, ${pulseOpacity})`);
        gradient.addColorStop(0.5, `rgba(225, 29, 72, ${pulseOpacity * 0.5})`);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the enhanced glow effect
      drawGlow();

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 29, 72, ${particle.opacity})`;
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      id="how-it-works"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black py-20"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            // animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            How GroderAI Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-gray-400"
          >
            Experience seamless code grading with our AI-powered platform that
            analyzes, evaluates, and provides detailed feedback for programming
            assignments.
          </motion.p>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-7xl"
        >
          <div className="relative rounded-lg shadow-2xl">
            <div className="absolute rounded-lg inset-0 bg-gradient-to-b from-pink-500/20 to-transparent pointer-events-none"></div>
            <Image
              src="/groder-half.png"
              width={3000}
              height={1440}
              alt="GroderAI Dashboard Preview"
              className=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </motion.div>

        <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
          <Separator className="bg-gray-800" />
        </div>

        {/* Bottom Cards */}
        <div className="grid md:grid-cols-2 mx-auto max-w-6xl justify-items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            // animate={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4 p-16 md:border-r border-gray-800"
          >
            <h3 className="text-2xl font-semibold text-white">
              Your assignments, your way
            </h3>
            <p className="text-gray-400">
              Create custom rubrics, set your own grading criteria, and let
              GroderAI handle the rest. Seamlessly integrate with your existing
              learning management system.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center text-pink-500 hover:text-pink-400 transition-colors"
            >
              Try GroderAI Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            // animate={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4 p-16"
          >
            <h3 className="text-2xl font-semibold text-white">
              Comprehensive Code Insights, Instantly
            </h3>
            <p className="text-gray-400">
              Analyze code and instructions effortlessly and export
              comprehensive reports in no time. Perfect for educators and
              students looking to save time and ensure accuracy in every review.
            </p>
          </motion.div>
        </div>

        <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
          <Separator className="bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
