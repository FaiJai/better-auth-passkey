"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Passkey } from "@better-auth/passkey";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function PasskeyList({ passkeys }: { passkeys: Passkey[] }) {
  const router = useRouter();

  if (passkeys.length === 0) {
    return <p>No passkeys registered.</p>;
  }

  const deletePasskey = (id: string) => {
    authClient.passkey.deletePasskey({
      id,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Passkey deleted successfully");
          router.refresh();
        },
        onError: (error) => {
          toast.error(`Error deleting passkey: ${error}`);
        },
      },
    });
  };

  return (
    <>
      {passkeys.map((passkey) => (
        <div key={passkey.id} className="p-4 border rounded mb-2">
          <h3 className="font-semibold">{passkey.name}</h3>
          <p className="text-sm text-gray-500">
            Registered on: {new Date(passkey.createdAt).toLocaleDateString()}
          </p>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => {
              deletePasskey(passkey.id);
            }}
          >
            <Trash2 />
          </Button>
        </div>
      ))}
    </>
  );
}
