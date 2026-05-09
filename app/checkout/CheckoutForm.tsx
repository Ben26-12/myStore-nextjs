"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useStore } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Please provide a detailed address"),
  city: z.string().min(2, "City name is too short"),
  note: z.string().optional(),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
  const router = useRouter();
  const cartItems = useStore((state) => state.cartItems);
  const clearCart = useStore((state) => state.clearCart);

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      note: "",
    },
  });

  const onSubmit = async (values: CheckoutValues) => {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in");
      const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * (item.quantity ?? 0),
        0,
      );
      const orderData = {
        user_id: user.id,
        full_name: values.fullName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        city: values.city,
        note: values.note,
        items: cartItems,
        total: totalAmount,
        status: "pending",
      };
      const { data: newOrder, error } = await supabase
        .from("orders")
        .insert([orderData])
        .select()
        .single();

      if (error) throw error;

      toast.success("Order placed successfully!");
      clearCart();
      router.push(`/thankyou?orderId=${newOrder.id}`);
    } catch (error) {
      console.error("Order placement failed:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold uppercase tracking-widest mb-6">
          Shipping Information
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Input {...form.register("fullName")} placeholder="John Doe" />
                <FieldError>
                  {form.formState.errors.fullName?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel>Email Address</FieldLabel>
                <Input
                  {...form.register("email")}
                  placeholder="john@example.com"
                />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
              </Field>
            </div>

            <Field>
              <FieldLabel>Phone Number</FieldLabel>
              <Input {...form.register("phone")} placeholder="090 123 4567" />
              <FieldError>{form.formState.errors.phone?.message}</FieldError>
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field className="md:col-span-2">
                <FieldLabel>Street Address</FieldLabel>
                <Input
                  {...form.register("address")}
                  placeholder="123 Street Name"
                />
                <FieldError>
                  {form.formState.errors.address?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel>City</FieldLabel>
                <Input {...form.register("city")} placeholder="Ho Chi Minh" />
                <FieldError>{form.formState.errors.city?.message}</FieldError>
              </Field>
            </div>

            <Field>
              <FieldLabel>Order Note (Optional)</FieldLabel>
              <Input
                {...form.register("note")}
                placeholder="Any special instructions..."
              />
            </Field>

            <Button
              type="submit"
              className="w-full bg-black text-white py-8 uppercase tracking-widest font-bold text-xs hover:bg-white hover:text-black border border-black transition-all rounded-none"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Processing..."
                : "Place Order Now"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
