import { GetServerSideProps } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Success({ customerName, product }: SuccessProps) {
  if (!customerName || !product)
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
  return (
    <>
      <Head>
        <title>Successful Purchase | rebike Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Successful Purchase!</h1>

        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </ImageContainer>

        <p>
          YEAH, <strong>{customerName}</strong>, your{" "}
          <strong>{product.name}</strong> is on its way.
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
  const product = session.line_items.data[0].price.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
