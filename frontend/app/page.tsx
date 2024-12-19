import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";

import { AnimatePresence } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <AnimatePresence>
        <main>
          <Hero />
        </main>
      </AnimatePresence>
    </div>
  );
}
