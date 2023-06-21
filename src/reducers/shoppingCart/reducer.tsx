import { ActionTypes } from "./actions";

export interface ProductItem {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  defaultPriceId: string;
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
      const productItem = action.payload;

      if (state.productItems.map((p) => p.id).includes(productItem.id)) {
        console.log("this only runs twice in dev mode");
        alert(`${productItem.name} already added to your shopping cart!`);
        return state;
      }

      return {
        ...state,
        productItems: [...state.productItems, productItem],
        quantity: state.quantity + 1,
        totalPrice: state.totalPrice + productItem.price,
      };
    }
    case ActionTypes.REMOVE_PRODUCT_ITEM: {
      console.log("item being removed...");
      const productToRemove = action.payload;
      const newProductList = state.productItems.filter(
        (p) => p.id !== productToRemove.id
      );

      return {
        ...state,
        productItems: newProductList,
        quantity: state.quantity - 1,
        totalPrice: state.totalPrice - productToRemove.price,
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
