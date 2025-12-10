import { auth } from "@/lib/auth";
import { LoginForm } from "./login/LoginForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <LoginForm />
    </div>
  );
}
