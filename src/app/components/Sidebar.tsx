// src/app/components/Sidebar.tsx

import Link from "next/link";
import { X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="h-6 w-6" />
        </button>
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link
                onClick={onClose}
                href="/"
                className="text-lg font-semibold"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                onClick={onClose}
                href="/#FeaturedCollections"
                className="text-lg font-semibold"
              >
                Nouvelle Collection
              </Link>
            </li>
            <li>
              <Link
                onClick={onClose}
                href="/#category"
                className="text-lg font-semibold"
              >
                Acheter par catégorie
              </Link>
            </li>
            <li>
              <Link
                onClick={onClose}
                href="/claim"
                className="text-lg font-semibold"
              >
                Réclamation
              </Link>
            </li>
            <li>
              <Link
                onClick={onClose}
                href="/contact"
                className="text-lg font-semibold"
              >
                Contactez-nous
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
