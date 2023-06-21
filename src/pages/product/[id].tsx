import { stripe } from "@/lib/stripe";
import { Stripe } from "stripe";

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import { GetStaticProps, GetStaticPaths } from "next/types";
import Image from "next/image";
import { useContext, useState } from "react";
import Head from "next/head";
import { ShoppingCartContext } from "@/contexts/ShoppingCartContext";
import { formatToBRL } from "@/utils/currencyFormatter";

interface ProdDetailProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProdDetailProps) {
  // //this is if fallback is true, instead of blocking (getStaticPaths
  // const { isFallback } = useRouter();
  // if (isFallback) {
  //   return <p>Loading...</p>;
  // }
  const { addProductItem } = useContext(ShoppingCartContext);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const handleAddProduct = (props: ProdDetailProps) => {
    addProductItem(props.product);
  };

  return (
    <>
      <Head>
        <title>{`${product.name} | rebike Shop`}</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            alt="product image"
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{formatToBRL(product.price)}</span>

          <p>{product.description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={() => handleAddProduct({ product })}
            title="Add this to my shopping cart"
          >
            Want it!
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //instead of String(), I could pass a generic GetStaticProps<any, {id: string}>
  const productId = String(params.id);

  const res = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });
  const price = res.default_price as Stripe.Price;

  const product = {
    id: res.id,
    name: res.name,
    imageUrl: res.images[0],
    description: res.description,
    price: Number(price.unit_amount) / 100,
    defaultPriceId: price.id,
  };

  return {
    props: { product },
    revalidate: 60 * 60 * 1, // 1h cache
  };
};

//this is only needed with getStaticProps
export const getStaticPaths: GetStaticPaths = async () => {
  // I don't want to fetch all productIds here because every static page takes about 1s to be generated, so I pass the fallback: 'true' to generate pages dynamically, or 'blocking' to use SSR
  return {
    paths: [{ params: { id: "prod_O5cCUeH5EoZVxd" } }],
    fallback: "blocking", //true is preferrable to be able to show loading
  };
};
