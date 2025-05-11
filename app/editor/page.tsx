"use client";

import { useHotkeys } from "react-hotkeys-hook";
import { useRef } from "react";

import { title } from "@/components/primitives";
import { Editor } from "@/Models/Editor";
import { Node } from "@/Models/Node";
import { Selection } from "@/Models/Selection";
import { alphabet } from "@/helpers/dict";

export default function EditorPage() {
  let node = Node.createDoc();
  let selection = new Selection();

  const editorVue = useRef<HTMLDivElement>(null as HTMLDivElement);

  const editor = new Editor({ Doc: node, Selection: selection });

  useHotkeys(alphabet, (event) => addText(event.key), []);
  useHotkeys("backspace", () => deleteText(), []);

  function addText(ch: string) {
    editor.insertText(ch);
    const updatedDoc = editor.Doc;

    editorVue.current.textContent = editor.Doc.Content.content[0]
      .text as string;
    console.log(updatedDoc);
  }

  function deleteText() {
    editor.deleteText();
    editorVue.current.textContent = editor.Doc.Content.content[0]
      .text as string;
  }

  return (
    <div className="flex flex-col">
      <h1 className={title()}>Editor</h1>
      <div ref={editorVue} className="border-2 h-dvh hover:cursor-text" />
    </div>
  );
}
