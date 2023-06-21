import { ActionTypes } from "./actions";

export interface ProductItem {
  id: string;
  name: string;
  imageUrl: number;
  description: Date;
  price: number; //string?
  defaultPriceId: number; //string?
}

interface ShoppingCartState {
  productItems: ProductItem[];
  quantity: number | null;
  totalPrice: number | null;
  isOpened: boolean;
}

export function shoppingCartReducer(state: ShoppingCartState, action: any) {
  switch (action.type) {
    case ActionTypes.TOGGLE_SHOPPING_CART: {
      const { isOpened } = action.payload;
      return {
        ...state,
        isOpened,
      };
    }

    case ActionTypes.ADD_NEW_PRODUCT_ITEM: {
      const { newProductItem } = action.payload;
      return {
        ...state,
        productItems: [...state.productItems, newProductItem],
        quantity: state.quantity + 1,
        totalPrice: state.totalPrice + newProductItem.price,
      };
    }
    case ActionTypes.REMOVE_PRODUCT_ITEM: {
      console.log("item being removed...");
      const { newProductItem } = action.payload;

      console.log("item removed: ");
      console.log(newProductItem);
      return {
        ...state,
      };
    }
    case ActionTypes.CHECKOUT_SHOPPING_CART: {
      console.log("checkout requested...");

      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
