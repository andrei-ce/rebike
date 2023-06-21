import {
  ShoppingCartContainer,
  ShoppingCartHeader,
  ProductList,
  ImageContainer,
  ProductItemDescription,
  TotalDetails,
} from "../styles/components/ShoppingCart";
import { X } from "@phosphor-icons/react";
import Image from "next/image";

import testimg from "../assets/brake.png";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "@/contexts/ShoppingCartContext";

export default function ShoppingCartSlider() {
  const { isOpened, toggleShoppingCartSidebar } =
    useContext(ShoppingCartContext);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const handleCloseShoppingCart = () => {
    toggleShoppingCartSidebar(false);
  };

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
        <li>
          <ImageContainer>
            <Image src={testimg} height={90} width={90} alt="" />
          </ImageContainer>
          <ProductItemDescription>
            <h3>Handlebar X-pro</h3>
            <span>R$ 49,99</span>
            <span>Remove</span>
          </ProductItemDescription>
        </li>

        <li>
          <ImageContainer>
            <Image src={testimg} height={90} width={90} alt="" />
          </ImageContainer>
          <ProductItemDescription>
            <h3>Paul Components V-brake</h3>
            <span>R$ 50,99</span>
            <span>Remove</span>
          </ProductItemDescription>
        </li>
      </ProductList>

      <TotalDetails>
        <div>
          <span>Items</span>
          <span>3 parts</span>
        </div>
        <div>
          <strong>Total</strong>
          <strong>R$ 100,98</strong>
        </div>
        <button disabled={isCreatingCheckoutSession} onClick={handleCheckout}>
          Checkout & Pay
        </button>
      </TotalDetails>
    </ShoppingCartContainer>
  );
}
