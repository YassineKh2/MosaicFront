import { Node } from "@/Models/Node";
import { Selection } from "@/Models/Selection";

export class Editor {
  // Starting node for the document
  Doc: Node;
  Selection: Selection;

  constructor(init: { Doc: Node; Selection: Selection }) {
    Object.assign(this as Object, init);
  }
}
