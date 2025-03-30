// components/LoginLayout.js
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LoginLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    const isAuthPage = ["/auth/signin", "/auth/signup"].includes(router.pathname);
    if (
      status !== "loading" &&
      !session &&
      !isAuthPage &&
      !hasRedirected
    ) {
      setHasRedirected(true);
      router.push("/auth/signup"); // Changed to /auth/signup
    }
  }, [session, status, router, hasRedirected]);

  if (status === "loading") {
    return (
      <div className="full-h flex flex-center">
        <div className="loading-bar">loading...</div>
      </div>
    );
  }

  if (!session) {
    return null; // Return null while redirecting or on auth pages
  }

  return <>{children}</>;
}