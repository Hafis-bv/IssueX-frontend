import Profile from "@/widgets/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "View and manage your IssueX profile. Update your personal information and account settings.",
};

export default function ProfilePage() {
  return (
    <>
      <Profile />
    </>
  );
}
