export class NodeType {
  // True if this is a block type
  isBlock: boolean;
  // True if this is the text node type.
  isText: boolean;
  // True if this node type has inline content.
  inlineContent: boolean;

  isDoc: boolean;

  constructor(props) {
    if (props === "isText") this.isText = true;
    if (props === "isDoc") this.isDoc = true;
  }
}
