import Image from "next/image";
import {navLinks} from "@/data/links.data";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 w-full text-white">
      <Image src='/assets/branding/withkm-logo.svg' alt="withkm-logo" width={140} height={28}/>
      <ul className="flex space-x-4">
        {navLinks.map((link) => (
          <li key={link.url}>
            <a href={link.url} className="hover:underline">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}