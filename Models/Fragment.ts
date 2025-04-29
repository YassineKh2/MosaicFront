import { Node } from "@/Models/Node";

export class Fragment {
  // The total of the size of its content nodes.
  readonly size: number;
  // The child nodes in this fragment.
  readonly content: Node[];

  constructor(content: Node[]) {
    this.content = content;
    this.size = content.reduce((n, child) => n + child.nodeSize, 0);
  }
}
