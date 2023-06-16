import { GetStaticProps } from "next";
import Image from "next/image";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { stripe } from "@/lib/stripe";
import { Stripe } from "stripe";
import { HomeContainer, Product } from "@/styles/pages/home";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    rtl: true,
    slides: {
      perView: 3,
      spacing: 38,
    },
  });

  return (
    <HomeContainer>
      <div ref={sliderRef} className="keen-slider">
        {products.map((p, idx) => {
          return (
            <div key={p.id} className={`keen-slider__slide number-slide${idx}`}>
              <Product>
                <Image src={p.imageUrl} width={520} height={480} alt="" />
                <footer>
                  <strong>{p.name}</strong>
                  <span>{p.price}</span>
                </footer>
              </Product>
            </div>
          );
        })}
      </div>
    </HomeContainer>
  );
}

// getServerSidePropsthis needs to run completely before showing any frontend elements
// NOTE: no loading state!
// therefore, only 1) indexer, bots and crawler critical info needs to be here
// or... when we need to hide something from the client side! This is the case here
export const getStaticProps: GetStaticProps = async () => {
  // unlike getServerSideProps, we dont have access to (req,res) in getStaticProps, because really it is a build command. If we need this kind of information (like a session cookie), this can't be a static page

  const res = await stripe.products.list({
    expand: ["data.default_price"], //since products is an array we use "data."
  });
  const products = res.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(price.unit_amount) / 100),
    };
  });

  return {
    props: { products },
    revalidate: 60 * 60 * 1, //this page will build every hour. Until then the same cached version will be used for all requests
  };
};

// getStaticProps --> SSG (uses CDN &caching)
// the above doesnt work by default in local env
// getServerSideProps --> SSR (used the next node.js server)
