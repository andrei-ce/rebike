import { styled } from "..";

export const Header = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "$gray800",
  padding: "0.75rem 1.25rem",
  width: "100%",
  margin: "0 0 1rem 0",
});

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
    backgroundColor: "$green500",
    padding: "0.6rem",

    "&:hover": {
      cursor: "pointer",
    },
  },

  ".badge": {
    position: "absolute",
    top: "0.8rem",
    right: "1.25rem",
    padding: "0.125rem 0.4rem",
    borderRadius: "50%",
    background: "rgb(201, 8, 8)",
    color: "$gray100",
  },
});
