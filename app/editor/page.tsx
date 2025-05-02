"use client";

import { useHotkeys } from "react-hotkeys-hook";

import { title } from "@/components/primitives";
import { Editor } from "@/Models/Editor";
import { Node } from "@/Models/Node";
import { Selection } from "@/Models/Selection";

export default function EditorPage() {
  let node = Node.createText("hi");
  let selection = new Selection();

  const editor = new Editor({ Doc: node, Selection: selection });

  useHotkeys("*", (event) => console.log(event.key), []);

  return (
    <div className="flex flex-col">
      <h1 className={title()}>Editor</h1>
      <div className="border-2 h-dvh hover:cursor-text" />
    </div>
  );
}
