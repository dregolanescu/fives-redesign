"use client";

import React from "react";

/**
 * Custom cell renderer for the "active" field in the list view.
 * Shows a green/muted dot + label instead of raw "true"/"false".
 */
export default function ActiveCell({ cellData }: { cellData: boolean }) {
  const active = Boolean(cellData);

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: "0.8125rem",
        fontWeight: 500,
        color: active
          ? "var(--theme-success-500, #8FBF9F)"
          : "var(--text-muted, #85827A)",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: active
            ? "var(--theme-success-500, #8FBF9F)"
            : "var(--text-muted, #85827A)",
          flexShrink: 0,
        }}
      />
      {active ? "Activ" : "Inactiv"}
    </span>
  );
}
