import {
  ReactNode,
  createContext,
  useState,
  useReducer,
  useEffect,
} from "react";
import {
  shoppingCartReducer,
  ProductItem,
} from "../reducers/shoppingCart/reducer";
import {
  // addNewProductItemAction,
  // checkoutShoppingCartAction,
  // removeProductItemAction,
  toggleShoppingCartAction,
} from "../reducers/shoppingCart/actions";

interface ShoppingCartStateInterface {
  productItems: ProductItem[];
  quantity: number | null; //string?
  totalPrice: number | null; //string?
  isOpened: boolean;
  toggleShoppingCartSidebar: (o: boolean) => void;
  // addProductItem: (p: ProductItem) => void;
  // removeProductItem: (p: ProductItem) => void;
  // checkoutShoppingCart: () => void;
}

export const ShoppingCartContext = createContext(
  {} as ShoppingCartStateInterface
);

interface ShoppingCartContextProviderProps {
  children: ReactNode;
}

export function ShoppingCartContextProvider({
  children,
}: ShoppingCartContextProviderProps) {
  // initializing context state
  const [shoppingCartState, dispatch] = useReducer(
    shoppingCartReducer,
    {
      productItems: [],
      quantity: null,
      totalPrice: null,
      isOpened: false,
    },
    // this is an argument that the reducer receives to restore state when initialized (inferred from the second argument)
    (initialState) => {
      //localStorage with be undefined on server side
      if (typeof localStorage !== "undefined") {
        const storedStateAsJSON = localStorage.getItem(
          "@rebike:shopping-cart-state-1.1.0"
        );
        if (storedStateAsJSON) {
          return JSON.parse(storedStateAsJSON);
        }
      }
      return initialState;
    }
  );

  const { productItems, quantity, totalPrice, isOpened } = shoppingCartState;

  function toggleShoppingCartSidebar(isOpened: boolean) {
    dispatch(toggleShoppingCartAction(isOpened));
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        productItems,
        quantity,
        totalPrice,
        isOpened,
        toggleShoppingCartSidebar,
        // addProductItem,
        // removeProductItem,
        // checkoutShoppingCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
