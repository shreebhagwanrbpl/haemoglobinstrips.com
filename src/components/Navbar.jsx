"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "items",
    "contact",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/items" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-violet-100 bg-white/90 backdrop-blur-xl">
      <div className="container-custom flex h-20 items-center justify-between">

        {/* Logo */}
        <Link
          href={makeLink("/")}
          className="flex items-center"
        >
          <Image
            src="/logo.png"
            alt="Raj Biosis"
            width={120}
            height={32}
            priority
            className="h-12 w-auto object-contain md:h-9"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 text-[15px] font-medium lg:flex">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={makeLink(link.path)}
              className="relative text-slate-700 transition-all duration-300 hover:text-violet-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-700 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}

        </nav>

        {/* Desktop Button */}
        <div className="hidden lg:block">

          <Link href={makeLink("/contact")}>
            <button className="rounded-xl bg-[#5B21B6] px-6 py-3 font-semibold text-white shadow-lg shadow-violet-300/30 transition-all duration-300 hover:-translate-y-1 hover:bg-[#6D28D9] hover:shadow-violet-400/40">
              Get Quote
            </button>
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl p-2 text-violet-700 transition hover:bg-violet-50 lg:hidden"
        >
          {menuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${menuOpen ? "max-h-[500px]" : "max-h-0"
          }`}
      >
        <div className="border-t border-violet-100 bg-white p-6">

          <nav className="flex flex-col gap-5">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={makeLink(link.path)}
                onClick={() => setMenuOpen(false)}
                className="font-medium text-slate-700 transition hover:text-violet-700"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href={makeLink("/contact")}
              onClick={() => setMenuOpen(false)}
            >
              <button className="mt-3 w-full rounded-xl bg-[#5B21B6] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#6D28D9]">
                Get Quote
              </button>
            </Link>

          </nav>

        </div>
      </div>
    </header>
  );
}