import { Mapping } from "@/Models/Mapping";

export class Selection {
  // The start of the selection stays fixed in place
  anchor: number;
  // The ending of the selection moves along with the cursor
  head: number;

  constructor(anchor = 0, head = 0) {
    this.anchor = anchor;
    this.head = head;
  }

  // Shift this selection through a series of position‐maps
  mapThrough(maps: Mapping) {
    this.anchor = maps.map(this.anchor);
    this.head = maps.map(this.head);

    return this;
  }
}
