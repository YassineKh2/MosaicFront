import React, { useState, useCallback } from "react";

/**
 * 2. Immutable Node Classes
 */
class TextNode {
  constructor(text = "") {
    this.type = "text";
    this.text = text;
  }

  // create a copy with new text
  copy(newText) {
    return new TextNode(newText);
  }
}

/**
 * 3. Transaction & Steps
 */
class Step {
  // base class
  apply(node) {
    throw new Error("apply must be implemented");
  }
}

class InsertTextStep extends Step {
  constructor(pos, text) {
    super();
    this.pos = pos;
    this.text = text;
  }

  apply(doc) {
    const before = doc.text.slice(0, this.pos);
    const after = doc.text.slice(this.pos);

    return new TextNode(before + this.text + after);
  }

  invert(doc) {
    // for undo: remove the inserted text
    return new DeleteTextStep(this.pos, this.text.length);
  }
}

class DeleteTextStep extends Step {
  constructor(pos, length) {
    super();
    this.pos = pos;
    this.length = length;
  }

  apply(doc) {
    const before = doc.text.slice(0, this.pos);
    const after = doc.text.slice(this.pos + this.length);

    return new TextNode(before + after);
  }

  invert(doc) {
    // for undo: not implemented in this prototype
    return null;
  }
}

class Transaction {
  constructor(state) {
    this.state = state;
    this.steps = [];
  }

  insertText(pos, text) {
    const step = new InsertTextStep(pos, text);

    this.steps.push(step);
    const newDoc = step.apply(this.state.doc);

    this.state = new EditorState(newDoc, pos + text.length);

    return this;
  }

  deleteText(pos, length) {
    const step = new DeleteTextStep(pos, length);

    this.steps.push(step);
    const newDoc = step.apply(this.state.doc);

    this.state = new EditorState(newDoc, pos);

    return this;
  }
}

/**
 * 4. Editor State
 */
class EditorState {
  constructor(doc, selection = 0) {
    this.doc = doc; // TextNode
    this.selection = selection; // cursor position
  }

  static create({ doc, selection }) {
    return new EditorState(doc, selection);
  }

  applyTransaction(tr) {
    return tr;
  }
}

/**
 * 5. React EditorView
 */
export default function PrototypeEditor() {
  // Initialize state with empty document
  const [editorState, setEditorState] = useState(
    EditorState.create({ doc: new TextNode(""), selection: 0 }),
  );

  const handleKeyDown = useCallback(
    (e) => {
      e.preventDefault();
      let tr = new Transaction(editorState);
      const { selection, doc } = editorState;

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        // Insert printable character
        tr = tr.insertText(selection, e.key);
      } else if (e.key === "Backspace") {
        if (selection > 0) tr = tr.deleteText(selection - 1, 1);
      } else if (e.key === "ArrowLeft") {
        tr.state = new EditorState(doc, Math.max(0, selection - 1));
      } else if (e.key === "ArrowRight") {
        tr.state = new EditorState(
          doc,
          Math.min(doc.text.length, selection + 1),
        );
      } else {
        return; // ignore other keys
      }
      setEditorState(tr.state);
    },
    [editorState],
  );

  /**
   * 6. Render Model -> DOM
   *    We map each character to a <span>, and show a cursor as a | at `selection`
   */
  const renderContent = () => {
    const { doc, selection } = editorState;
    const chars = doc.text.split("");
    const nodes = [];

    chars.forEach((ch, idx) => {
      if (idx === selection) {
        nodes.push(
          <span key="cursor" className="cursor">
            |
          </span>,
        );
      }
      nodes.push(
        <span key={idx} className="text-char">
          {ch}
        </span>,
      );
    });
    // if at end, show cursor
    if (selection === chars.length) {
      nodes.push(
        <span key="cursor-end" className="cursor">
          |
        </span>,
      );
    }

    return nodes;
  };

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        minHeight: "40px",
        fontFamily: "monospace",
        cursor: "text",
        outline: "none",
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {renderContent()}
    </div>
  );
}
