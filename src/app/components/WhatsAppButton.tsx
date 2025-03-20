"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import Link from "next/link";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  position?: "bottom-right" | "bottom-left";
}

export default function WhatsAppButton({
  phoneNumber,
  message = "Besoin d’un sac stylé et pratique ? 👜✨ Découvrez nos modèles tendance et de qualité sur moietoi.ma! Livraison rapide & offres spéciales. 🔥",
  position = "bottom-right",
}: WhatsAppButtonProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // Format phone number (remove any non-digit characters)
  const formattedPhone = phoneNumber.replace(/\D/g, "");

  // Create WhatsApp URL with phone and encoded message
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
    message
  )}`;

  // Determine position classes
  const positionClasses =
    position === "bottom-right" ? "right-4 sm:right-6" : "left-4 sm:left-6";

  return (
    <div className={`fixed bottom-4 sm:bottom-6 ${positionClasses} z-50`}>
      {/* Tooltip */}
      {isTooltipVisible && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 mb-2 w-64 animate-fade-in">
          <button
            onClick={() => setIsTooltipVisible(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close tooltip"
          >
            <X size={16} />
          </button>
          <p className="text-sm text-gray-700 mb-3">
            Besoin d'aide? Contactez-nous sur WhatsApp pour une réponse rapide!
          </p>
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-2 px-4 rounded-md transition-colors"
          >
            Démarrer la conversation
          </Link>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={() => setIsTooltipVisible(!isTooltipVisible)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={24} className="mr-0" />
        <span className="sr-only">WhatsApp Chat</span>
      </button>
    </div>
  );
}
