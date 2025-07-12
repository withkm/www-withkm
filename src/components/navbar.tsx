import Image from "next/image";
import { navLinks } from "@/data/links.data";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="nav-bar flex items-center justify-between p-4 w-full text-foreground transition-all duration-300">
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <Image 
          src='/assets/branding/withkm-logo.svg' 
          alt="withkm-logo" 
          width={140} 
          height={28}
          className="nav-logo"
        />
      </Link>
      <ul className="flex space-x-8">
        {navLinks.map((link) => (
          <li key={link.url} className="group relative">
            <Link 
              href={link.url} 
              className="nav-link relative px-3 py-2 overflow-hidden"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="nav-link-underline"></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}