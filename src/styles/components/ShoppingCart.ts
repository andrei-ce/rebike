import { styled } from "..";

export const ShoppingCartContainer = styled("aside", {
  position: "absolute",
  top: 0,
  right: "-30rem",
  // display: "flex",
  display: "none",
  flexDirection: "column",

  width: "30rem",
  height: "100vh",
  padding: "1.5rem",
  backgroundColor: "$gray900",
  boxShadow: "-5px 0px 15px 0px rgba(0, 0, 0, 0.79)",

  opacity: 0,
  transition: "all 0.3s ease-in-out",

  "&.opened": {
    transform: "translateX(-30rem)",
    display: "flex",
    opacity: 1,
  },
});

export const ShoppingCartHeader = styled("div", {
  padding: "0.5rem 1.25rem 0 0",
  div: {
    display: "flex",
    flexDirection: "row-reverse",
  },

  svg: {
    "&:hover": {
      cursor: "pointer",
    },
  },

  h1: {
    marginBottom: "1.5rem",
    fontSize: "$lg",
  },
});

export const ProductList = styled("ul", {
  listStyle: "none",
  margin: "0 0 auto 0",
  padding: 0,
  display: "flex-column",
  flexGrow: 1,

  li: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gap: "1.25rem",
    marginBottom: "1rem",
  },
});

export const ImageContainer = styled("div", {
  width: "120px",
  height: "120px",
  background: "linear-gradient(180deg, #cdcdcd 0%, #888 100%)",
  borderRadius: 8,
  padding: "0.25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const ProductItemDescription = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",

  h3: {
    color: "$gray300",
    fontSize: "$md",
    fontWeight: "normal",
  },

  span: {
    display: "block",
    fontSize: "$md",
    fontWeight: "bold",

    "&:last-child": {
      color: "$green500",
      cursor: "pointer",
    },
  },
});

export const TotalDetails = styled("div", {
  marginTop: "auto",

  div: {
    padding: "0 0.25rem",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "$md",
    fontWeight: "bold",
    margin: "0.75rem 0",

    "&:first-child": {
      color: "$gray300",
      fontWeight: "normal",
    },
  },

  button: {
    marginTop: "1.25rem",
    backgroundColor: "$green500",
    border: 0,
    color: "$white",
    borderRadius: 8,
    width: "100%",
    padding: "1.25rem",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "$md",

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    "&:not(:disabled):hover": {
      backgroundColor: "$green300",
    },
  },
});
