"use client";

import React from "react";

/**
 * Minimal Lexical JSON → React renderer for article body.
 * Handles: paragraph, heading (h1-h6), horizontalrule,
 *          text formatting (bold, italic, underline, strikethrough),
 *          links, and linebreaks.
 */

// Lexical text format bitmask flags
const IS_BOLD = 1;
const IS_ITALIC = 2;
const IS_STRIKETHROUGH = 4;
const IS_UNDERLINE = 8;

type LexicalNode = {
  type: string;
  tag?: string;
  format?: number | string;
  text?: string;
  children?: LexicalNode[];
  fields?: { url?: string; newTab?: boolean; linkType?: string };
  url?: string;
  [key: string]: any;
};

function renderTextNode(node: LexicalNode, key: number): React.ReactNode {
  if (node.type === "linebreak") {
    return <br key={key} />;
  }

  if (node.type === "link" || node.type === "autolink") {
    const url = node.fields?.url || node.url || "#";
    const newTab = node.fields?.newTab ?? true;
    return (
      <a
        key={key}
        href={url}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className="text-gold-dark hover:text-gold underline underline-offset-2 transition-colors"
      >
        {node.children?.map((child, i) => renderTextNode(child, i))}
      </a>
    );
  }

  if (node.type !== "text" || !node.text) {
    // Unknown inline node — render children if any
    if (node.children) {
      return (
        <span key={key}>
          {node.children.map((child, i) => renderTextNode(child, i))}
        </span>
      );
    }
    return null;
  }

  const format = typeof node.format === "number" ? node.format : 0;
  let element: React.ReactNode = node.text;

  if (format & IS_BOLD) {
    element = <strong>{element}</strong>;
  }
  if (format & IS_ITALIC) {
    element = <em>{element}</em>;
  }
  if (format & IS_UNDERLINE) {
    element = <u>{element}</u>;
  }
  if (format & IS_STRIKETHROUGH) {
    element = <s>{element}</s>;
  }

  return <React.Fragment key={key}>{element}</React.Fragment>;
}

function renderBlockNode(node: LexicalNode, index: number): React.ReactNode {
  switch (node.type) {
    case "paragraph": {
      const children = node.children?.map((child, i) => renderTextNode(child, i));
      // Skip empty paragraphs (spacers)
      const hasContent = node.children?.some(
        (c) => (c.text && c.text.trim()) || c.type === "linebreak" || c.type === "link"
      );
      if (!hasContent) return <div key={index} className="h-4" />;
      return (
        <p key={index} className="text-body-lg text-stone-600 leading-relaxed">
          {children}
        </p>
      );
    }

    case "heading": {
      const children = node.children?.map((child, i) => renderTextNode(child, i));
      const Tag = (node.tag || "h2") as keyof JSX.IntrinsicElements;
      const headingClasses: Record<string, string> = {
        h1: "text-display font-bold text-stone-900 mt-10 mb-4",
        h2: "text-title font-bold text-stone-900 mt-10 mb-4",
        h3: "text-xl font-bold text-stone-900 mt-8 mb-3",
        h4: "text-lg font-semibold text-stone-800 mt-6 mb-2",
        h5: "text-base font-semibold text-stone-800 mt-4 mb-2",
        h6: "text-sm font-semibold text-stone-700 mt-4 mb-2 uppercase tracking-wide",
      };
      return (
        <Tag key={index} className={headingClasses[node.tag || "h2"] || headingClasses.h2}>
          {children}
        </Tag>
      );
    }

    case "horizontalrule": {
      return (
        <hr key={index} className="my-8 border-t border-stone-200" />
      );
    }

    default: {
      // Fallback: try to render children as paragraph
      if (node.children) {
        const children = node.children.map((child, i) => renderTextNode(child, i));
        return (
          <p key={index} className="text-body-lg text-stone-600 leading-relaxed">
            {children}
          </p>
        );
      }
      return null;
    }
  }
}

export function LexicalRenderer({
  content,
}: {
  content: { root?: { children?: LexicalNode[] } } | null | undefined;
}) {
  if (!content?.root?.children) return null;

  return (
    <>
      {content.root.children.map((node, index) => renderBlockNode(node, index))}
    </>
  );
}
