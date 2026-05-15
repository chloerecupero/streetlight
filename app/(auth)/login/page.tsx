import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Sign in",
};

type PageProps = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const { next, error } = await searchParams;
  return <LoginForm nextPath={next} initialErrorParam={error} />;
}
