import {
  ShoppingCartContainer,
  ShoppingCartHeader,
  ProductList,
  ImageContainer,
  ProductItemDescription,
  TotalDetails,
} from "../styles/components/ShoppingCart";
import { ShoppingCartContext } from "@/contexts/ShoppingCartContext";
import { api } from "@/lib/axios";
import { useContext, useState } from "react";
import { X } from "@phosphor-icons/react";
import Image from "next/image";
import { formatToBRL } from "@/utils/currencyFormatter";
import { ProductItem } from "@/reducers/shoppingCart/reducer";

export default function ShoppingCartSlider() {
  const {
    productItems,
    quantity,
    totalPrice,
    isOpened,
    toggleShoppingCartSidebar,
    removeProductItem,
  } = useContext(ShoppingCartContext);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const handleCloseShoppingCart = () => {
    toggleShoppingCartSidebar(false);
  };

  //TODO
  const handleRemoveProduct = (productItem: ProductItem) => {
    console.log("removing product: ", productItem);
    removeProductItem(productItem);
  };

  //TODO
  const handleCheckout = async () => {
    console.log("handling checkout...");

    try {
      setIsCreatingCheckoutSession(true);

      // const res = await api.post(`/checkout`, {
      //   priceId: product.defaultPriceId,
      // });
      // const { checkoutUrl } = res.data;
      // window.location.href = checkoutUrl;
    } catch (error) {
      // should connect to Datadog or Sentry or any other observability tool
      setIsCreatingCheckoutSession(false);

      alert("error when trying to checkout 😭");
      console.error(error);
    }
    // console.log(product.defaultPriceId);
  };

  return (
    <ShoppingCartContainer className={isOpened ? "opened" : null}>
      <ShoppingCartHeader>
        <div>
          <X size={32} color={"gray"} onClick={handleCloseShoppingCart} />
        </div>
        <h1>Shopping Cart</h1>
      </ShoppingCartHeader>

      <ProductList>
        {productItems.length < 1 ? (
          <div>No items added yet</div>
        ) : (
          productItems.map((p) => {
            return (
              <li key={p.id}>
                <ImageContainer>
                  <Image src={p.imageUrl} height={90} width={90} alt="" />
                </ImageContainer>
                <ProductItemDescription>
                  <h3>{p.name}</h3>
                  <span>{formatToBRL(p.price)}</span>
                  <span onClick={() => handleRemoveProduct(p)}>Remove</span>
                </ProductItemDescription>
              </li>
            );
          })
        )}
      </ProductList>

      <TotalDetails>
        <div>
          <span>Items</span>
          <span>{quantity} parts</span>
        </div>
        <div>
          <strong>Total</strong>
          <strong>{formatToBRL(totalPrice)}</strong>
        </div>
        <button disabled={isCreatingCheckoutSession} onClick={handleCheckout}>
          Checkout & Pay
        </button>
      </TotalDetails>
    </ShoppingCartContainer>
  );
}
