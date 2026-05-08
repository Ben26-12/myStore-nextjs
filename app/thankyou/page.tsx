"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ThankyouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">
          Thank You
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          Your order has been placed successfully! We will notify you once your
          order is shipped.
        </p>
        <div className="space-y-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full bg-white border-black  hover:bg-black hover:text-white rounded-none uppercase tracking-widest  text-lg py-8"
          >
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
