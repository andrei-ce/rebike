import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import { Container } from "@/styles/pages/app";
import { ShoppingCartContextProvider } from "@/contexts/ShoppingCartContext";
import Navbar from "@/components/Navbar";
import ShoppingCartSlider from "@/components/ShoppingCart";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  //this component is the main component which renders other pages/components under the <Component/> element below
  return (
    <ShoppingCartContextProvider>
      <Container>
        <Navbar />
        <Component {...pageProps} />
        <ShoppingCartSlider />
      </Container>
    </ShoppingCartContextProvider>
  );
}
