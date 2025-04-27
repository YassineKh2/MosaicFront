import { Node } from "@/Models/Node";

export class Fragment {
  // The total of the size of its content nodes.
  size: number;
  // The child nodes in this fragment.
  content: Node[];
}
