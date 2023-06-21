import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function checkout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. receive product(s) id(s)
  const { priceIds } = req.body;
  if (priceIds.length < 1)
    return res.status(400).json({ error: "Price not found" });
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  // 2. make call to create checkout cart
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  // 2b) TODO: iterate over all products to provide as part of line_items
  //
  const lineItems = priceIds.map((price) => {
    return { price, quantity: 1 };
  });

  console.log(lineItems);

  const checkoutSessions = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: lineItems,
  });

  // 3. redirect user to stripe.com/checkout --> in client side component after the response below is sent

  // 4. recieve user redirected from stripe.com/checkout after payment --> done by Stripe using the success / cancel URLs
  return res.status(201).json({ checkoutUrl: checkoutSessions.url });
}
