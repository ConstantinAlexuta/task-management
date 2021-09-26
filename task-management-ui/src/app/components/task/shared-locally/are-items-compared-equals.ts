import { Task } from '../model/task.model';

export function areTaskItemsComparedEquals(item1: Task, item2: Task): boolean {
  if (
    item1.id != item2.id ||
    item1.description != item2.description ||
    item1.status != item2.status
  ) {
    return false;
  } else return true;
}
