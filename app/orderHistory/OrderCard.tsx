"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrderCard({ order }: { order: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-sm overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Order Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-50 border-b border-gray-200 p-4 sm:p-6 flex justify-between text-sm cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <div>
          <p className="text-gray-400 uppercase text-[10px] mb-1 font-medium tracking-widest">
            Order Placed
          </p>
          <p className="font-medium text-gray-900 text-sm">
            {new Date(order.created_at).toLocaleDateString("vi-VN")}
          </p>
        </div>
        <div>
          <p className="text-gray-400 uppercase text-[10px] mb-1 font-medium tracking-widest">
            Total
          </p>
          <p className="font-medium text-gray-900 text-sm">
            ${order.total.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-gray-400 uppercase text-[10px] mb-1 font-medium tracking-widest">
            Status
          </p>
          <p className="font-medium text-gray-900 flex items-center gap-2 text-sm">
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </p>
        </div>
        <div className="hidden sm:block">
          <p className="text-gray-400 uppercase text-[10px] mb-1 font-medium tracking-widest">
            Order ID
          </p>
          <p className="font-medium text-gray-500 font-mono text-sm">
            #{order.id.split("-")[0].toUpperCase()}
          </p>
        </div>

        {/* Toggle Indicator */}
        <div className="flex min-w-[150px] items-center justify-end gap-2 text-gray-500">
          <span className="uppercase text-[10px] font-medium tracking-widest hidden sm:block opacity-70">
            {isOpen ? "CLOSE" : "VIEW DETAILS"}
          </span>
          <div
            className={cn(
              "transition-transform duration-500 ease-out",
              isOpen ? "rotate-180" : "rotate-0",
            )}
          >
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Order Body */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition:
            "grid-template-rows 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms",
        }}
        className={cn("opacity-0", isOpen ? "opacity-100" : "opacity-0")}
      >
        <div className="overflow-hidden">
          <div className="p-6 sm:p-8 space-y-8 border-t border-gray-100 bg-white">
            {order.items?.map((item: any) => (
              <div key={item.id} className="flex gap-6 items-center last:mb-0">
                <div className="relative w-20 h-24 sm:w-28 sm:h-32 shrink-0 bg-gray-50 border border-gray-100 rounded-sm p-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, 150px"
                  />
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="max-w-md">
                    <h3 className="font-medium text-gray-900 text-base mb-1.5 line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex flex-col items-start gap-1 text-xs font-medium uppercase tracking-widest text-gray-500">
                      <span>Qty: {item.quantity}</span>
                      <span>Price: ${item.price}</span>
                    </div>
                  </div>
                  <div className="font-medium text-lg text-gray-900">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
