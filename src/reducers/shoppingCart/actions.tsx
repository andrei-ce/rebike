import { ProductItem } from "./reducer";

export enum ActionTypes {
  ADD_NEW_PRODUCT_ITEM = "ADD_NEW_PRODUCT_ITEM",
  REMOVE_PRODUCT_ITEM = "REMOVE_PRODUCT_ITEM",
  CLEAR_SHOPPING_CART = "CLEAR_SHOPPING_CART",
  TOGGLE_SHOPPING_CART = "TOGGLE_SHOPPING_CART",
}

export function addNewProductItemAction(productItem: ProductItem) {
  return {
    type: ActionTypes.ADD_NEW_PRODUCT_ITEM,
    payload: productItem,
  };
}

export function removeProductItemAction(productItem: ProductItem) {
  return {
    type: ActionTypes.REMOVE_PRODUCT_ITEM,
    payload: productItem,
  };
}

export function clearShoppingCartAction() {
  return {
    type: ActionTypes.CLEAR_SHOPPING_CART,
  };
}

export function toggleShoppingCartAction(isOpened: boolean) {
  return {
    type: ActionTypes.TOGGLE_SHOPPING_CART,
    payload: {
      isOpened,
    },
  };
}
