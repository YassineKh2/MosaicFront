import { Node } from "@/Models/Node";

export abstract class Step {
  abstract apply(doc: Node): Node;

  abstract invert(doc: Node): Step;

  abstract getMap(): (pos: number) => number;
}

export class InsertStep extends Step {
  pos: number;
  text: string;

  constructor(pos: number, text: string) {
    super();
    this.pos = pos;
    this.text = text;
  }

  apply(doc: Node): Node {
    const before = doc.text?.slice(0, this.pos);
    const after = doc.text?.slice(this.pos);

    return Node.createText(before + this.text + after);
  }

  invert(doc: Node): Step {
    return new DeleteStep(this.pos, this.pos + this.text.length);
  }

  getMap() {
    const { pos, text } = this;
    const len = text.length;

    // returns P if no changes otherwise returns p + added text length
    return (p: number) => (p < pos ? p : p + len);
  }
}

export class DeleteStep extends Step {
  from: number;
  to: number;
  deletedText: string;

  constructor(from: number, to: number) {
    super();
    this.from = from;
    this.to = to;
  }

  apply(doc: Node): Node {
    const before = doc.text?.slice(0, this.from);
    const after = doc.text?.slice(this.to);

    this.deletedText = doc.text?.slice(this.from, this.to) || "";

    return Node.createText(before + after);
  }

  invert(doc: Node): Step {
    return new InsertStep(this.from, this.deletedText);
  }

  getMap() {
    const { from, to } = this;
    const delLen = to - from;

    return (p: number) => {
      if (p <= from) return p;
      if (p <= to) return from;

      return p - delLen;
    };
  }
}
