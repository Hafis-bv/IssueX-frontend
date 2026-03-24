"use client";
import { Container } from "@/components/Container";
import { useAuth } from "@/context/userContext";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import API from "@/utils/api";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { user, setUser } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();

  const handleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  useEffect(() => {
    window.addEventListener("click", () => setIsProfileMenuOpen(false));

    return () => {
      window.removeEventListener("click", () => setIsProfileMenuOpen(false));
    };
  }, []);

  const handleUserLogout = async () => {
    await API.handleLogout();
    setUser(null);
    router.push("/login");
  };

  const headerLinks = [
    { id: 1, label: "Dashboard", href: "/" },
    { id: 2, label: "Projects", href: "/projects" },
    { id: 3, label: "Profile", href: "/profile" },
    { id: 4, label: "Settings", href: "/settings" },
  ];

  if (!user) return null;

  return (
    <header className="py-4 px-10 bg-[#0b101b] border-b border-[#1a1d24]">
      <Container className="flex justify-between items-center">
        <Link href="/" className="text-zinc-100 font-semibold tracking-wide">
          IssueX
        </Link>

        <div>
          {user ? (
            <div onClick={(e) => e.stopPropagation()} className="relative">
              <button
                onClick={handleProfileMenu}
                className="bg-[#111622] border border-[#1a1d24] text-zinc-200 font-semibold text-sm rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#151a26] transition"
              >
                {user.name.charAt(0).toUpperCase() || "U"}
              </button>

              <AnimatePresence mode="wait">
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex flex-col gap-2 absolute top-12 right-0 bg-[#0d111a] border border-[#1a1d24] w-36 rounded-xl p-3 shadow-lg"
                  >
                    {headerLinks.map((link) => (
                      <Link
                        key={link.id}
                        href={link.href}
                        className="text-sm text-zinc-300 hover:text-white px-2 py-1 rounded-md hover:bg-[#111622] transition"
                      >
                        {link.label}
                      </Link>
                    ))}

                    <button
                      onClick={handleUserLogout}
                      className="border-t border-[#1a1d24] mt-2 pt-2 text-left text-sm text-red-400 hover:text-red-300 cursor-pointer"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm text-zinc-300 hover:text-white transition"
            >
              Login
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
};
