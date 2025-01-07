"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            GroderAI
          </Link>
          <div className="hidden md:flex space-x-8">
            {/* Implement links later

            It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </Link> */}
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/gustavocsak/groderai"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com"
              className="text-gray-300 hover:text-white transition-colors"
            ></Link>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
