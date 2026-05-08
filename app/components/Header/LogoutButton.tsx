"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error", error);
      toast.error("Failed to logout. Please try again.", {
        position: "top-center",
      });
    } else {
      toast.success("Logged out successfully!", { position: "top-center" });
      router.refresh();
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={handleLogout}
        className="font-medium text-gray-600 text-md hover:text-primary transition cursor-pointer"
      >
        Log out
      </Button>
    </>
  );
}
