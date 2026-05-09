import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ThankyouPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const orderId = params.orderId;

  if (!orderId || typeof orderId !== "string") {
    redirect("/");
  }

  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <h1 className="text-2xl font-bold uppercase tracking-tighter mb-4 text-red-500">
          Order Not Found
        </h1>
        <p className="mb-8">We couldn't find the order you're looking for.</p>
        <Button asChild variant="outline" className="rounded-none uppercase">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 py-20">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">
          Thank You, {order.full_name}!
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-4">
          Your order has been placed successfully. We will notify you once your
          order is shipped.
        </p>

        {/* Order Details Card */}
        <div className="bg-gray-50 border border-gray-100 p-8 text-left mb-10 mt-8 rounded-sm">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-gray-200 pb-4">
            Order Details
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div className="text-gray-500 uppercase">Order ID:</div>
            <div className="font-medium text-right sm:text-left break-all">
              {order.id}
            </div>

            <div className="text-gray-500 uppercase">Date:</div>
            <div className="font-medium text-right sm:text-left">
              {new Date(order.created_at).toLocaleDateString()}
            </div>

            <div className="text-gray-500 uppercase">Shipping Address:</div>
            <div className="font-medium text-right sm:text-left">
              {order.address}, {order.city}
            </div>

            <div className="text-gray-500 uppercase">Total Amount:</div>
            <div className="font-medium text-right sm:text-left text-lg">
              ${order.total}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full bg-white border-black hover:bg-black hover:text-white rounded-none uppercase tracking-widest text-lg py-8"
          >
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
