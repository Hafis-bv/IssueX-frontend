import { ForgotPassword } from "@/widgets/ForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Reset your IssueX account password. Enter your email to receive password reset instructions.",
};

export default function ForgotPasswordPage() {
  return (
    <div>
      <ForgotPassword />
    </div>
  );
}
