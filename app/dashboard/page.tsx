import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignoutButton } from "./signout-button";

export default async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h1>Dashboard for {session.user.email}</h1>
      <SignoutButton />
    </div>
  );
}
