import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
    lineHeight: 1.4,
  },

  a: {
    display: "block",
    marginTop: "5rem",
    fontSize: "$lg",
    color: "$green500",
    textDecoration: "none",
    fontWeight: "bold",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const ImageContainerWrapper = styled("div", {
  display: "flex",
  margin: "2rem 0",
});

export const ImageContainer = styled("div", {
  width: 145,
  height: 145,
  background: "linear-gradient(180deg, #cdcdcd 0%, #888 100%)",
  borderRadius: "50%",
  padding: "0.25rem",
  marginTop: "4rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  flex: "none",
  margin: "0px -1rem",

  img: {
    objectFit: "cover",
  },
  boxShadow: "-5px 0px 30px 0px rgba(0, 0, 0, 0.79)",
});
