import Stripe from "stripe";

export const stripe = new Stripe(
  //todo: check if the variable exists before using it
  String(process.env.STRIPE_SECRET_KEY),
  {
    apiVersion: "2022-11-15",
    appInfo: {
      name: "rebike",
    },
  }
);
