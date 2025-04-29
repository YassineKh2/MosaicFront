"use client";

import { useEffect, useRef } from "react";

import { title } from "@/components/primitives";

export default function EditorPage() {
  const Editor = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.altKey) return;

    if (event.code === "Space") return;

    const key = event.key;

    Editor.current?.append(key);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className={title()}>Editor</h1>
      <div ref={Editor} className="border-2 h-dvh hover:cursor-text" />
    </div>
  );
}
