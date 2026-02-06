"use client";
import { useAuth } from "@/context/userContext";

export default function Home() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <h1>{user ? `Hello ${user.name}` : "Not logged In"}</h1>
    </div>
  );
}
