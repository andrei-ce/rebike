import { styled } from "..";

export const NavbarMenuContainer = styled("nav", {
  display: "flex",
  alignItems: "center",

  ul: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },

  li: {
    display: "inline-block",
    marginRight: "0.5rem",
    borderRadius: 8,
    backgroundColor: "$gray800",
    padding: "0.6rem",

    "&:hover": {
      cursor: "pointer",
    },
  },
});
