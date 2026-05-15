import { VerifyEmailForm } from "@/components/auth/verify-email-form";

export const metadata = {
  title: "Verify email",
};

type PageProps = {
  searchParams: Promise<{ email?: string }>;
};

export default async function SignupVerifyPage({ searchParams }: PageProps) {
  const { email } = await searchParams;
  return <VerifyEmailForm initialEmail={email ?? ""} />;
}
