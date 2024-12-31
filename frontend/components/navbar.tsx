import ThemeToggle from "@/components/theme-toggle";

export default function Navbar() {
  return (
    <nav className="m-0 w-full flex justify-between items-center">
      <h1 className="text-xl font-bold">GroderAI</h1>
      <ThemeToggle />
    </nav>
  );
}
