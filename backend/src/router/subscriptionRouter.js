const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.all("/", (req, res, next) => {
  res.json({ message: "message from ticket router" });
});

router.post("/create-checkout", async (req, res) => {
  try {
    const { plan } = req.body;

    console.log(plan)

    // Define your plans and pricing
    const planConfig = {
      basic: {
        name: "Basic Plan",
        amount: 999,
        type: "subscription",
        interval: "month",
      },
      pro: {
        name: "Pro Plan",
        amount: 1999,
        type: "subscription",
        interval: "month",
      },
      elite: {
        name: "Elite Plan",
        amount: 19999,
        type: "one-time",
      },
    };

    const selectedPlan = planConfig[plan];

    if (!selectedPlan) {
      return res.status(400).json({ error: "Invalid plan selected" });
    }

    // Prepare priceData based on plan type
    let priceData;
    if (selectedPlan.type === "one-time") {
      priceData = {
        currency: "usd",
        product_data: { name: selectedPlan.name },
        unit_amount: selectedPlan.amount,
      };
    } else {
      priceData = {
        currency: "usd",
        product_data: { name: selectedPlan.name },
        unit_amount: selectedPlan.amount,
        recurring: { interval: selectedPlan.interval },
      };
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      mode: selectedPlan.type === "one-time" ? "payment" : "subscription",
      success_url: `${req.headers.origin}/subscription-success?plan=${plan}`,
      cancel_url: `${req.headers.origin}/subscription`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
