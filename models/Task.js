import { Timestamp } from "firebase/firestore";

class Task {
  constructor() {
    this.title = "";
    this.desc = "";
    this.due_date = null;
    this.links = [];
    this.start_date = null;
  }

  // constructor(title : str, desc) {
  //   this.title = title;
  //   this.desc = desc;
  // }
}
