import { Handbag } from "@phosphor-icons/react";
import { NavbarMenuContainer } from "../styles/components/NavBarMenu";

export const NavbarMenu = () => {
  const openShoppingCartSlider = () => {
    console.log("open shopping cart");
  };

  return (
    <NavbarMenuContainer>
      <ul>
        <li>
          <Handbag size={26} onClick={openShoppingCartSlider} />
        </li>
      </ul>
    </NavbarMenuContainer>
  );
};
