import { Metadata } from "next";
import { LoginForm } from "../widgets/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your IssueX account to manage projects, track issues, and organize your development workflow.",
};

export default function Login() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
