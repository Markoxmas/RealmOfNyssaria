import { Currency, Stackable } from "../types/itemSystem/itemSystem";

export const itemModifier = {
  // Equipment

  // Stackable
  mergeStackables(stackable1: Stackable, stackable2: Stackable): Stackable {
    if (stackable1.registryId !== stackable2.registryId) {
      throw new Error("Cannot merge stackables of different types");
    }
    return {
      ...stackable1,
      quantity: stackable1.quantity + stackable2.quantity,
    };
  },
  addToStackable(stackable: Stackable, amount: number): Stackable {
    return {
      ...stackable,
      quantity: stackable.quantity + amount,
    };
  },
  removeFromStackable(stackable: Stackable, amount: number): Stackable {
    return {
      ...stackable,
      quantity: stackable.quantity - amount,
    };
  },
  // Unstackable

  // Currency
  mergeCurrency(currency1: Currency, currency2: Currency): Currency {
    if (currency1.registryId !== currency2.registryId) {
      throw new Error("Cannot merge currencies of different types");
    }
    return {
      ...currency1,
      quantity: currency1.quantity + currency2.quantity,
    };
  },
  addToCurrency(currency: Currency, amount: number): Currency {
    return {
      ...currency,
      quantity: currency.quantity + amount,
    };
  },
  removeFromCurrency(currency: Currency, amount: number): Currency {
    return {
      ...currency,
      quantity: currency.quantity - amount,
    };
  },
};
