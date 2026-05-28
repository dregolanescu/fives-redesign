"use client";

import React, { useId } from "react";
import { useField } from "@payloadcms/ui";

/**
 * Custom toggle for the "active" checkbox field.
 * Replaces the default Payload checkbox with a gold-accented toggle switch.
 * Uses FIVE'S brand gold (#d4a843) for the active state.
 */
export default function ActiveToggle({ path }: { path: string }) {
  const { value, setValue } = useField<boolean>({ path });
  const id = useId();
  const checked = Boolean(value);

  return (
    <div className="active-toggle-field" style={{ padding: "12px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <label
          htmlFor={id}
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--text-primary, #F2F0EA)",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          Activ
        </label>
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => setValue(!checked)}
          style={{
            position: "relative",
            width: 44,
            height: 24,
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.25s ease",
            backgroundColor: checked
              ? "var(--fives-gold, #d4a843)"
              : "var(--surface-elevated, #363632)",
            outline: "none",
            padding: 0,
            flexShrink: 0,
          }}
        >
          {/* Thumb */}
          <span
            style={{
              position: "absolute",
              top: 2,
              left: checked ? 22 : 2,
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: checked
                ? "#fff"
                : "var(--text-muted, #85827A)",
              transition: "left 0.25s ease, background-color 0.25s ease",
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
            }}
          />
        </button>
      </div>
      {/* Status hint */}
      <p
        style={{
          marginTop: 6,
          fontSize: "0.75rem",
          color: checked
            ? "var(--fives-gold, #d4a843)"
            : "var(--text-muted, #85827A)",
          transition: "color 0.25s ease",
        }}
      >
        {checked ? "Acest slide este vizibil pe site" : "Slide-ul nu apare pe site"}
      </p>
    </div>
  );
}
