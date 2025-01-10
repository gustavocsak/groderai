"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: {
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;
    }[] = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      const particleCount = 100; // Increased particle count
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1, // Increased particle size
          speed: Math.random() * 1 + 0.5, // Increased speed
          opacity: Math.random() * 0.5 + 0.3, // Added opacity variation
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 29, 72, ${particle.opacity})`;
        ctx.fill();

        particle.y -= particle.speed;
        particle.opacity -= 0.001;
        // console.log(particle.opacity);
        if (particle.y + particle.radius < 0) {
          particle.y = canvas.height + particle.radius;
          particle.x = Math.random() * canvas.width;
          particle.opacity = Math.random() * 0.5 + 0.3;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <footer className="relative bg-black text-white py-12 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50" // Increased opacity
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">GroderAI</h3>
            <p className="text-gray-400">
              Revolutionizing code grading with AI-powered analysis and
              feedback.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#hero"
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/analyze"
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                >
                  Live Demo
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/gustavocsak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/gustavo-de-sa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} GroderAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
