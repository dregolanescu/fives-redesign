"use client";

import React, { useCallback, useRef, useState } from "react";
import { useDocumentInfo, useFormModified } from "@payloadcms/ui";

/**
 * GalleryBulkUpload — additive helper rendered ABOVE the gallery array field.
 *
 * Lets an editor drop / pick many images at once. Each file is uploaded to the
 * Media collection, then attached to this project's `gallery` array via the
 * same REST save path the Save button uses. The existing gallery array field is
 * left untouched (still used for captions, reordering and deletion).
 *
 * Safe by design: it never mutates Payload's internal form state and only runs
 * against an already-saved project, so it cannot corrupt the schema or the
 * existing manual flow.
 */
type Status = "idle" | "uploading" | "done" | "error";

const gold = "var(--fives-gold, #d4a843)";
const goldSoft = "var(--fives-gold-soft, rgba(212,168,67,0.12))";

export default function GalleryBulkUpload() {
  const { id } = useDocumentInfo();
  const modified = useFormModified();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState<{ done: number; total: number }>({ done: 0, total: 0 });
  const [message, setMessage] = useState<string>("");
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
      if (files.length === 0) {
        setStatus("error");
        setMessage("Selecteaza fisiere imagine (jpg, png, webp).");
        return;
      }
      if (!id) {
        setStatus("error");
        setMessage("Salveaza proiectul o data inainte de a incarca poze in galerie.");
        return;
      }
      if (modified) {
        setStatus("error");
        setMessage("Ai modificari nesalvate. Apasa Save intai, apoi incarca pozele (pagina se reincarca dupa upload).");
        return;
      }

      setStatus("uploading");
      setMessage("");
      setProgress({ done: 0, total: files.length });

      try {
        // 1. Upload each image to the Media collection.
        const mediaIds: string[] = [];
        for (const file of files) {
          const fd = new FormData();
          fd.append("file", file);
          const res = await fetch("/api/media", { method: "POST", body: fd, credentials: "include" });
          if (!res.ok) throw new Error(`Upload esuat pentru "${file.name}" (${res.status}).`);
          const json = await res.json();
          const mediaId = json?.doc?.id;
          if (!mediaId) throw new Error(`Raspuns invalid la upload pentru "${file.name}".`);
          mediaIds.push(mediaId);
          setProgress((p) => ({ ...p, done: p.done + 1 }));
        }

        // 2. Read the current gallery (server is the source of truth).
        const getRes = await fetch(`/api/projects/${id}?depth=0`, { credentials: "include" });
        if (!getRes.ok) throw new Error(`Nu am putut citi proiectul (${getRes.status}).`);
        const project = await getRes.json();
        const existing = Array.isArray(project?.gallery) ? project.gallery : [];
        const normalizedExisting = existing.map((row: any) => ({
          ...(row?.id ? { id: row.id } : {}),
          image: row?.image && typeof row.image === "object" ? row.image.id : row?.image,
          caption: row?.caption ?? "",
        }));

        // 3. Append the new rows and save via the same path as the Save button.
        const gallery = [...normalizedExisting, ...mediaIds.map((mid) => ({ image: mid, caption: "" }))];
        const patchRes = await fetch(`/api/projects/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ gallery }),
        });
        if (!patchRes.ok) throw new Error(`Salvarea galeriei a esuat (${patchRes.status}).`);

        setStatus("done");
        setMessage(`${files.length} ${files.length === 1 ? "poza adaugata" : "poze adaugate"} in galerie. Se reincarca...`);
        setTimeout(() => window.location.reload(), 800);
      } catch (e: any) {
        setStatus("error");
        setMessage(e?.message || "A aparut o eroare la upload.");
      }
    },
    [id, modified],
  );

  const busy = status === "uploading";

  return (
    <div className="gallery-bulk-upload" style={{ marginBottom: 18 }}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => !busy && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !busy) inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (!busy) handleFiles(e.dataTransfer.files);
        }}
        style={{
          border: `2px dashed ${dragOver ? gold : "var(--border, #474741)"}`,
          background: dragOver ? goldSoft : "var(--surface-elevated, #363632)",
          borderRadius: 8,
          padding: "22px 18px",
          textAlign: "center",
          cursor: busy ? "default" : "pointer",
          transition: "border-color 0.2s ease, background-color 0.2s ease",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary, #F2F0EA)" }}>
          {busy ? `Se incarca... ${progress.done}/${progress.total}` : "Incarca mai multe poze deodata"}
        </div>
        <div style={{ marginTop: 6, fontSize: "0.8rem", color: "var(--text-secondary, #B8B5AD)" }}>
          Trage pozele aici sau da click pentru a selecta. Se urca automat si se adauga in galeria de mai jos.
        </div>
      </div>

      {message && (
        <p
          style={{
            marginTop: 8,
            fontSize: "0.8rem",
            fontWeight: 500,
            color: status === "error" ? "var(--error-500, #e26d5c)" : gold,
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
