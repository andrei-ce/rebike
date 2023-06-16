import { globalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import logo from "../../public/logo-full.png";
import Image from "next/image";
import { Container, Header } from "@/styles/pages/app";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  //this component is the main component which renders other pages/components under the <Component/> element below
  return (
    <Container>
      <Header>
        <Image src={logo} width={185} height={70} alt="logo" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
