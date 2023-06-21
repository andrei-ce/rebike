import { NavbarMenuContainer, Header } from "../styles/components/Navbar";
import { Handbag } from "@phosphor-icons/react";
import Image from "next/image";
import logo from "../../public/logo-full.png";
import Link from "next/link";
import { useContext } from "react";
import { ShoppingCartContext } from "@/contexts/ShoppingCartContext";

export default function Navbar() {
  const { toggleShoppingCartSidebar, quantity } =
    useContext(ShoppingCartContext);

  const handleOpenShoppingCart = () => {
    toggleShoppingCartSidebar(true);
  };

  return (
    <Header>
      <Link href="/">
        <Image src={logo} width={185} height={70} alt="logo" />
      </Link>
      <NavbarMenuContainer>
        <ul>
          <li>
            <Handbag size={26} onClick={handleOpenShoppingCart} />
            {quantity > 0 && <span className="badge">{quantity}</span>}
          </li>
        </ul>
      </NavbarMenuContainer>
    </Header>
  );
}
