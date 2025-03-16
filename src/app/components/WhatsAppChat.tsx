"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import Image from "next/image";

interface WhatsAppChatProps {
  phoneNumber: string;
  businessName?: string;
  avatar?: string;
  welcomeMessage?: string;
  position?: "bottom-right" | "bottom-left";
  autoOpen?: boolean;
  autoOpenDelay?: number;
}

export default function WhatsAppChat({
  phoneNumber,
  businessName = "Luxury Bags",
  avatar = "/logo.png", // Replace with your logo
  welcomeMessage = "Bonjour! Comment puis-je vous aider aujourd'hui?",
  position = "bottom-right",
  autoOpen = false,
  autoOpenDelay = 3000,
}: WhatsAppChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  // Format phone number (remove any non-digit characters)
  const formattedPhone = phoneNumber.replace(/\D/g, "");

  // Auto-open chat after delay if enabled
  useEffect(() => {
    if (autoOpen && !hasInteracted) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, autoOpenDelay);

      return () => clearTimeout(timer);
    }
  }, [autoOpen, autoOpenDelay, hasInteracted]);

  // Handle button click
  const toggleChat = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true);
  };

  // Handle sending message
  const handleSendMessage = () => {
    if (message.trim()) {
      window.open(
        `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
      setMessage("");
    }
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Determine position classes
  const positionClasses =
    position === "bottom-right" ? "right-4 sm:right-6" : "left-4 sm:left-6";

  return (
    <div className={`fixed bottom-4 sm:bottom-6 ${positionClasses} z-50`}>
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl mb-4 w-[320px] sm:w-[350px] overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-green-500 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white mr-3">
                <Image
                  src={avatar || "/placeholder.svg"}
                  alt={businessName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-medium">{businessName}</h3>
                <p className="text-green-100 text-xs">En ligne</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-green-200 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-gray-50 h-[250px] overflow-y-auto">
            <div className="bg-green-100 p-3 rounded-lg rounded-tl-none inline-block max-w-[80%]">
              <p className="text-gray-800 text-sm">{welcomeMessage}</p>
              <span className="text-gray-500 text-xs mt-1 block">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 border-t flex items-center">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Tapez votre message..."
              className="flex-1 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-10 max-h-32 min-h-[40px]"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`ml-2 p-2 rounded-full ${
                message.trim()
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              } transition-colors`}
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={toggleChat}
        className={`bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
          isOpen ? "scale-90 bg-red-500 hover:bg-red-600" : ""
        }`}
        aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
