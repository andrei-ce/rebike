import { GetServerSideProps } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import {
  ImageContainer,
  ImageContainerWrapper,
  SuccessContainer,
} from "../styles/pages/success";
import { useContext } from "react";
import { ShoppingCartContext } from "@/contexts/ShoppingCartContext";

interface SuccessProps {
  customerName: string;
  productsBought: {
    quantity: number;
    imageUrls: string[];
  };
}

export default function Success({
  customerName,
  productsBought,
}: SuccessProps) {
  const { clearShoppingCart } = useContext(ShoppingCartContext);

  if (!customerName || productsBought.quantity <= 0) {
    return (
      <SuccessContainer>
        <h1>Oops...</h1>

        <p>
          Something went wrong... Please contact us to check if your purchase
          was made at +55 11 97152-6666
        </p>

        <Link href="/">Go back to main catalog</Link>
      </SuccessContainer>
    );
  }

  return (
    <>
      <Head>
        <title>Successful Purchase | rebike Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Successful Purchase!</h1>

        <ImageContainerWrapper>
          {productsBought.imageUrls.map((img) => {
            return (
              <ImageContainer key={img}>
                <Image src={img} width={120} height={110} alt="" />
              </ImageContainer>
            );
          })}
        </ImageContainerWrapper>

        <p>
          YEAH <strong>{customerName.split(" ")[0]}</strong>, your{" "}
          {productsBought.quantity === 1
            ? "bike part is on its way!"
            : `${productsBought.quantity} bike parts are on their way!`}
        </p>

        <Link href="/">Go back to main catalog</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false, //301 or 302 status code. False because this is not the default behavior
      },
    };
  }

  const sessionId = String(query.session_id);
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details.name;
  const productList = session.line_items.data.map((product) => {
    return product.price.product as Stripe.Product;
  });

  const quantity = productList.length;
  const imageUrls = productList.map((p) => p.images[0]);

  return {
    props: {
      customerName,
      productsBought: {
        quantity,
        imageUrls,
      },
    },
  };
};
