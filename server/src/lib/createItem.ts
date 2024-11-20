import { Item } from "../types/Item";
import { itemLibrary } from "../itemLibrary";

export const createItem = (id: number, quantity?: number): Item => {
  return { ...itemLibrary[id - 1], quantity: quantity || 0 };
};
