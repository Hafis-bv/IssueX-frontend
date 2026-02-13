'use client'
import { Container } from "@/components/Container"
import { useAuth } from "@/context/userContext";
import Link from "next/link"
import {AnimatePresence, motion} from 'motion/react'
import { useEffect, useState } from "react";

export const Header = () => {
    const { user } = useAuth();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const handleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    }

    useEffect(() => {
        window.addEventListener('click', () => setIsProfileMenuOpen(false));

        return () => {
            window.removeEventListener('click', () => setIsProfileMenuOpen(false));
        }
    }, []);


    const headerLinks = [
        {id: 1, label: 'Dashboard', href: '/'},
        {id: 2, label: 'Projects', href: '/projects'},
        {id: 3, label: 'Profile', href: '/profile'},
        {id: 4, label: 'Settings', href: '/settings'},
    ]

    return (
        <header className="py-5 px-10 bg-primary/80">
            <Container className="flex justify-between items-center">
            <Link href="/">IssueX</Link>
            <div>
                {user ? (
                  <div onClick={(e) => e.stopPropagation()} className="relative">
                    <button onClick={handleProfileMenu} className="bg-[#080b13] font-semibold text-xl rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">{user.name.charAt(0).toUpperCase() || 'U'}</button>

                   <AnimatePresence mode="wait">
                   {isProfileMenuOpen && (
                        <motion.div initial={{opacity: 0, y:-10}} animate={{opacity: 1, y:0}} transition={{duration: 0.2}} exit={{opacity: 0, y:-10}} className="flex flex-col gap-2 absolute top-12 right-0 bg-[#333] w-30 rounded-md p-4">
                            {headerLinks.map((link) => (
                                <Link key={link.id} href={link.href} className="hover:text-gray-300">{link.label}</Link>
                            ))}                            
                            <button className="border-t border-gray-500 pt-2 text-left font-bold tracking-[1px]">Logout</button>
                        </motion.div>
                    )}
                   </AnimatePresence>
                  </div>
                ) : (
                    <Link href="/login">Login</Link>
                )}
                </div>
            </Container>
        </header>
    )
}