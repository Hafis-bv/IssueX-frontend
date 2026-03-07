import { Metadata } from "next";
import { ResetPassword } from "../widgets/ResetPassword";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Create a new password for your IssueX account to regain access to your projects and tasks.",
};

export default function ResetPasswordPage() {
  return (
    <div>
      <ResetPassword />
    </div>
  );
}
