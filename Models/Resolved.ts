import { Node } from "@/Models/Node";

interface Resolved {
  // The node that we are searching for
  node: Node;
  // the offset inside that node
  offset: number;
  // The path of ancestor nodes
  path: { node: Node; childIndex: number }[];
}

// find the node with the pos
export function resolvePos(root: Node, pos: number): Resolved {
  let remaining = pos;
  const path: Resolved["path"] = [];
  let current: Node = root;

  while (!current.Type.isText) {
    // It's an element node: walk its children
    const children = current.Content.content;
    let i = 0;

    for (; i < children.length; i++) {
      const child = children[i];
      const size = child.nodeSize();

      if (remaining <= size) {
        // The position is inside this child
        path.push({ node: current, childIndex: i });
        current = child;
        break;
      }
      remaining -= size;
    }
    // If we ran off the end, return to the last child
    if (i === children.length) {
      path.push({ node: current, childIndex: children.length - 1 });
      current = children[children.length - 1];
      remaining = current.nodeSize();
    }
  }

  return { node: current, offset: remaining, path };
}
