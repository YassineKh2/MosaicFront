import { NodeType } from "@/Models/NodeType";
import { Fragment } from "@/Models/Fragment";
import { Mark } from "@/Models/Mark";

export class Node {
  // Type of the node ex block or linear
  Type: NodeType;
  // Children of the node
  Content: Fragment;
  // An Object that affect the node as a whole, such as alignment or width, and are specific to the node type
  attrs: {};
  // Array of Proprieties affect individual pieces of text within a node and are about how the text looks (like bold, italic, underlined, or links).
  Marks: Mark[];
  // The content of the node if it's a text node
  text: String | undefined;
}
