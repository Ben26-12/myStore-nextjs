"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
const formSchema = z
  .object({
    email: z.string().email("Invalid email address").min(1),
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters long")
      .max(256),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(100)
      .trim(),
    passwordConfirmation: z
      .string()
      .min(6, "Password confirmation must be at least 6 characters long")
      .max(100)
      .trim(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Password confirmation does'nt match",
    path: ["passwordConfirmation"],
  });

export default function RegisterForm() {
  const supabase = createClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      if (error) {
        throw error;
      }
      toast.success("Registered successfully!", {
        position: "top-center",
        action: {
          label: "Click to login",
          onClick: () => router.push("/login"),
        },
      });
      router.refresh();
    } catch (error: any) {
      console.error("Form submission error", error);
      toast.error("Failed to register. Please try again.", {
        position: "top-center",
      });
    }
  }

  return (
    <>
      <div className="mt-10">
        <h2 className="text-center text-3xl font-semibold">
          Create your account
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
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              placeholder="Enter your name "
              {...form.register("name")}
            />

            <FieldError>{form.formState.errors.name?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              {...form.register("password")}
            />

            <FieldError>{form.formState.errors.password?.message}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="passwordConfirmation">
              Password confirmation
            </FieldLabel>
            <Input
              id="passwordConfirmation"
              type="password"
              placeholder="Comfirm your password"
              {...form.register("passwordConfirmation")}
            />
            <FieldError>
              {form.formState.errors.passwordConfirmation?.message}
            </FieldError>
          </Field>
          <Button size="lg" className="cursor-pointer w-full" type="submit">
            Sign up
          </Button>
        </form>
      </Form>
    </>
  );
}
