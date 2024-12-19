import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              GroderAI
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link
              href="#features"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center">
            <Link href="/analyze">
              <Button size="lg">Try it now</Button>
            </Link>
            
          </div>
        </div>
      </div>
    </header>
  );
}
