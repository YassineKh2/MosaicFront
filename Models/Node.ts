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

  // Size of the node : <p>One</p> would equal 5
  nodeSize: number;

  private constructor(init: {
    Type: NodeType;
    Content: Fragment;
    attrs: {};
    Marks: Mark[];
    text?: string;
  }) {
    Object.assign(this, init);
  }

  static createText(text: string, marks: Mark[] = []): Node {
    const nodeType = new NodeType("isText");

    return new Node({
      Type: nodeType,
      Content: new Fragment([]),
      attrs: {},
      Marks: marks,
      text,
    });
  }
}
