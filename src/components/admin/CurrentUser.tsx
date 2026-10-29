"use client";

import React from "react";
import Link from "next/link";
import { useAuth, useConfig } from "@payloadcms/ui";

const ROLE_LABELS: Record<string, string> = {
  admin: "Administrator",
  editor: "Editor",
};

type FivesUser = {
  email?: string | null;
  name?: string | null;
  role?: string | null;
};

/**
 * Shows who is logged in, in the top-right of the admin header
 * (registered in payload.config.ts → admin.components.actions).
 * Name if set, otherwise the email; role as a small badge; full email on hover.
 * Clicking it opens the account page.
 */
export default function CurrentUser() {
  const { user } = useAuth();
  const { config } = useConfig();

  if (!user) return null;

  const u = user as unknown as FivesUser;
  const email = (u.email || "").trim();
  const displayName = (u.name || "").trim() || email;
  if (!displayName) return null;

  const role = u.role ? ROLE_LABELS[u.role] || u.role : null;
  const adminRoute = config?.routes?.admin || "/admin";
  const accountPath = config?.admin?.routes?.account || "/account";

  return (
    <Link
      href={`${adminRoute}${accountPath}`}
      prefetch={false}
      className="fives-current-user"
      title={email ? `Conectat ca ${email}` : undefined}
    >
      <span className="fives-current-user__dot" aria-hidden="true" />
      <span className="fives-current-user__label">Conectat:</span>
      <span className="fives-current-user__name">{displayName}</span>
      {role && <span className="fives-current-user__role">{role}</span>}
    </Link>
  );
}
