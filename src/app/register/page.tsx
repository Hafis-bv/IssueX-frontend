import { RegisterForm } from "@/widgets/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create your IssueX account to start managing projects, tracking issues, and organizing your tasks.",
};

export default function Register() {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
