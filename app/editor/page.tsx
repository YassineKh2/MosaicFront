"use client";
import { useState } from "react";

import { title } from "@/components/primitives";
import PrototypeEditor from "@/app/editor/editor";

export default function EditorPage() {
  const [qef, setQef] = useState();

  return (
    <div className="flex flex-col">
      <h1 className={title()}>Editor</h1>
      <div className="wrapper">
        <PrototypeEditor />
      </div>
    </div>
  );
}
