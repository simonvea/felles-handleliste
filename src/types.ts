export type Todo = {
  id: string;
  task: string;
  done: boolean;
  index?: number;
  createdByEmail: string;
  created: Date;
  lastChanged: Date;
  hide: boolean;
};
