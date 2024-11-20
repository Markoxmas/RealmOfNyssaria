import { Item } from "../types/Item";
import { createItem } from "./createItem";

export const getInitialItems = (): Item[] => {
  return [createItem(1, 50000), createItem(2, 1000)];
};
