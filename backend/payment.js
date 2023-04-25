const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handlePayment = async (req, res) => {
  const { paymentMethodId } = req.body;

  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(
      paymentMethodId
    );

    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: 1000, // amount in cents
      currency: 'usd',
      description: 'Test payment',
      confirm: true,
    });

    res.json({ success: true });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = handlePayment;
