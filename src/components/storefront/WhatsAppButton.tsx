import React from "react";
import { MessageCircle } from "lucide-react";
import { formatAud } from "@/lib/utils";

interface WhatsAppButtonProps {
  whatsappNumber?: string | null;
  vehicleTitle: string;
  stockNumber: string;
  totalPriceCents: number;
  className?: string;
}

export function WhatsAppButton({
  whatsappNumber,
  vehicleTitle,
  stockNumber,
  totalPriceCents,
  className = "",
}: WhatsAppButtonProps) {
  if (!whatsappNumber) return null;

  // Clean phone number (strip spaces, dashes, ensure country code)
  let cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
  if (cleanNumber.startsWith("0")) {
    cleanNumber = "61" + cleanNumber.slice(1);
  }

  const message = `Hi! I'm interested in the ${vehicleTitle} (Stock #${stockNumber}) advertised for ${formatAud(
    totalPriceCents
  )}. Is this vehicle still available for inspection?`;

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition shadow-sm ${className}`}
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span>Chat on WhatsApp</span>
    </a>
  );
}
