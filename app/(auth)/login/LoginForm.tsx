"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const formSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6).max(100).trim(),
});

export default function LoginForm() {
  const supabase = createClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        throw error;
      }
      toast.success("Login successfully!", { position: "top-center" });
      router.push(redirectTo);
      router.refresh();
    } catch (error: any) {
      console.error("Form login error", error);
      toast.error("Failed to login. Please try again.");
    }
  }

  return (
    <>
      <div className="mt-10">
        <h2 className="text-center text-3xl font-semibold">
          Login to your account
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 mx-auto py-10"
        >
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              placeholder="Example@gmail.com"
              {...form.register("email")}
            />

            <FieldError>{form.formState.errors.email?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              type="password"
              id="password"
              placeholder="Your password"
              {...form.register("password")}
            />

            <FieldError>{form.formState.errors.password?.message}</FieldError>
          </Field>

          <Button size="lg" className="cursor-pointer w-full" type="submit">
            Log in
          </Button>
        </form>
      </Form>
    </>
  );
}
