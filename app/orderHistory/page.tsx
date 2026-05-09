import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import OrderCard from "./OrderCard";

export default async function OrderHistoryPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/orderHistory");
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-500">
          Failed to load orders. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-inner-width w-full mx-auto px-6 py-16 min-h-screen">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-semibold text-center uppercase tracking-tighter mb-2">
          Order History
        </h1>
        <p className="text-gray-500 text-sm tracking-widest uppercase">
          Review your past purchases
        </p>
      </div>

      {orders?.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 border border-gray-100 rounded-sm">
          <p className="text-gray-500 mb-6 uppercase tracking-widest text-sm">
            You haven't placed any orders yet.
          </p>
          <Button
            asChild
            variant="outline"
            className="rounded-none uppercase tracking-widest border-black"
          >
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {orders?.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
