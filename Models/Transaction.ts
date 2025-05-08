import { Node } from "@/Models/Node";
import { Step, InsertStep, DeleteStep } from "@/Models/Step";
import { Mapping } from "@/Models/Mapping";

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

  // Apply Steps
  apply(doc: Node): Node {
    return this.steps.reduce((d, step) => step.apply(d), doc);
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
