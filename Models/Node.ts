import { NodeType } from "@/Models/NodeType";
import { Fragment } from "@/Models/Fragment";
import { Mark } from "@/Models/Mark";
import { Mapping } from "@/Models/Mapping";

export class Node {
  // Type of the node ex block or linear
  readonly Type: NodeType;
  // Children of the node
  readonly Content: Fragment;
  // An Object that affect the node as a whole, such as alignment or width, and are specific to the node type
  readonly attrs: {};
  // Array of Proprieties affect individual pieces of text within a node and are about how the text looks (like bold, italic, underlined, or links).
  readonly Marks: Mark[];
  // The content of the node if it's a text node
  readonly text: String | undefined;

  private constructor(init: {
    Type: NodeType;
    Content: Fragment;
    attrs: {};
    Marks: Mark[];
    text?: string;
    Mapping?: Mapping;
  }) {
    Object.assign(this as Object, init);
  }

  // Create the starting point for the document
  static createDoc(): Node {
    const nodeType = new NodeType("isDoc");

    const fragment = new Fragment([Node.createText("")]);

    return new Node({
      Type: nodeType,
      Content: fragment,
      attrs: {},
      Marks: [],
      text: "",
    });
  }

  // Create a basic text node
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

  // Create a node
  static createElement(
    type: NodeType,
    attrs: {},
    children: Node[] = [],
    marks: Mark[] = [],
  ): Node {
    return new Node({
      Type: type,
      Content: new Fragment(children),
      attrs,
      Marks: marks,
    });
  }

  // Size of the node : < p > One < / p> would equal 5
  nodeSize(): number {
    if (this.Type.isText) {
      return this.text?.length ?? 0;
    }

    return this.Content.size;
  }
}
