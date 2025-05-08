"use client";

import { useHotkeys } from "react-hotkeys-hook";
import { useRef } from "react";

import { title } from "@/components/primitives";
import { Editor } from "@/Models/Editor";
import { Node } from "@/Models/Node";
import { Selection } from "@/Models/Selection";
import { Transaction } from "@/Models/Transaction";

export default function EditorPage() {
  let node = Node.createDoc();
  let selection = new Selection();

  const editor = useRef<HTMLDivElement>(null as HTMLDivElement);

  new Editor({ Doc: node, Selection: selection });
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  useHotkeys(alphabet, (event) => addtext(event.key), []);
  useHotkeys("backspace", (event) => {}, []);

  function addtext(text: String) {
    let trans = new Transaction();

    trans.insertText(selection.head, text);
    node = trans.apply(node);
    selection.mapThrough(trans.maps);
    editor.current.textContent = node.text as string;
  }

  return (
    <div className="flex flex-col">
      <h1 className={title()}>Editor</h1>
      <div ref={editor} className="border-2 h-dvh hover:cursor-text" />
    </div>
  );
}
