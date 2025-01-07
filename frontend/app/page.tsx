import HowItWorks from "@/components/landing/how-it-works";
import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Footer from "@/components/landing/footer";

import { AnimatePresence } from "framer-motion";

export default function Home() {
  return (
    <div className=" flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <AnimatePresence>
        <main className="h-full flex flex-col flex-1">
          <Hero />
          <HowItWorks />
          <Footer />
        </main>
      </AnimatePresence>
    </div>
  );
}
