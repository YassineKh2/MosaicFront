import { Node } from "@/Models/Node";
import { DeleteStep, InsertStep, Step } from "@/Models/Step";
import { Mapping } from "@/Models/Mapping";
import { resolvePos } from "@/Models/Resolved";

export class Transaction {
  steps: Step[] = [];
  maps = new Mapping();

  // Create Steps
  insertText(pos: number, text: string) {
    const step = new InsertStep(pos, text);

    this.steps.push(step);
    const map = step.getMap();

    this.maps.addMap(map);

    return this;
  }

  deleteRange(from: number, to: number) {
    const step = new DeleteStep(from, to);

    this.steps.push(step);
    this.maps.addMap(step.getMap());

    return this;
  }

  // Apply Steps and search for the affected node
  apply(doc: Node, pos: number): Node {
    let { node, path } = resolvePos(doc, pos);
    let newDoc = this.steps.reduce((node, step) => step.apply(node), node);

    const parent = path[path.length - 1].node;
    const index = path[path.length - 1].childIndex;
    const beforeAndAfter = parent.Content.content;

    const newChildren = [
      ...beforeAndAfter.slice(0, index),
      newDoc,
      ...beforeAndAfter.slice(index + 1),
    ];

    return Node.createElement(
      parent.Type,
      parent.attrs,
      newChildren,
      parent.Marks,
    );
  }

  invert(doc: Node): Transaction {
    // invert each step in reverse order to build an undo transaction
    const undo = new Transaction();
    let tmpDoc = doc;

    for (let i = this.steps.length - 1; i >= 0; i--) {
      const inv = this.steps[i].invert(tmpDoc);

      undo.steps.push(inv);
      undo.maps.addMap(inv.getMap());

      tmpDoc = this.steps[i].apply(tmpDoc);
    }

    return undo;
  }
}
