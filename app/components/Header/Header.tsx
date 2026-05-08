import Link from "next/link";
import CartIcon from "./CartIcon";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";

import Navbar from "./Navbar";
import { createClient } from "@/lib/supabase/server";

async function Header() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <Navbar>
      <div className="inner max-w-inner-width w-full mx-auto">
        <nav className="flex items-center justify-between px-6">
          <div className="text-xl font-bold text-primary">
            <Link href="/">MY-STORE</Link>
          </div>

          <div className="space-x-6 font-medium text-gray-600">
            <Link href="/" className="hover:text-primary transition">
              Home
            </Link>
            <Link href="/collection" className="hover:text-primary transition">
              Collection
            </Link>
          </div>
          <div className="space-x-6 font-medium text-gray-600 flex items-center ">
            {session ? (
              <>
                <LogoutButton />
                <CartIcon />
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="hover:text-primary transition"
                >
                  Sign up
                </Link>
                <Link href="/login" className="hover:text-primary transition">
                  Log in
                </Link>
                <CartIcon />
              </>
            )}
          </div>
        </nav>
      </div>
    </Navbar>
  );
}

export default Header;
