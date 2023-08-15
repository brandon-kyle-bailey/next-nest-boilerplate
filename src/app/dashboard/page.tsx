"use client";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import Loading from "../components/loading.component";

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="flex flex-wrap flex-row justify-between p-10">
      <h1>Dashboard</h1>
      <div className="flex flex-row items-center space-x-4">
        <p>{session?.user?.name}</p>
        <Image
          src={session?.user?.image as string}
          alt={session?.user?.name as string}
          className="w-10 h-10 rounded-full"
          width={100}
          height={24}
          priority
        />
      </div>
    </div>
  );
}
