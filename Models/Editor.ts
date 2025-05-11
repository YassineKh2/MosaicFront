import { Node } from "@/Models/Node";
import { Selection } from "@/Models/Selection";
import { Transaction } from "@/Models/Transaction";

export class Editor {
  // Starting node for the document
  Doc: Node;
  // Selection of the document
  Selection: Selection;

  constructor(init: { Doc: Node; Selection: Selection }) {
    Object.assign(this as Object, init);
  }

  insertText(text: string) {
    const tr = new Transaction();

    tr.insertText(this.Selection.head, text);
    this.Doc = tr.apply(this.Doc, this.Selection.head);
    this.Selection.mapThrough(tr.maps);
  }

  deleteText() {
    const tr = new Transaction().deleteRange(
      this.Selection.head - 1,
      this.Selection.head,
    );

    this.Doc = tr.apply(this.Doc, this.Selection.head);
    this.Selection.mapThrough(tr.maps);
  }
}
