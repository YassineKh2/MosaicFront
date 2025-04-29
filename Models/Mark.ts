import { MarkType } from "@/Models/MarkType";

export class Mark {
  // Type of the mark
  MarkType: MarkType;
  // Additional Information for certain types , ex href , title ...
  attrs: {};
}
