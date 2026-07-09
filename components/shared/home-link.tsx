"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

interface HomeLinkProps {
  className?: string;
  children: React.ReactNode;
}

export function HomeLink({ className, children }: HomeLinkProps) {
  const { data: session } = useSession();
  const href = session?.user?.id ? "/dashboard" : "/";

  return (
    <Link href={href} className={className} aria-label="Go to ResumeAI home">
      {children}
    </Link>
  );
}
