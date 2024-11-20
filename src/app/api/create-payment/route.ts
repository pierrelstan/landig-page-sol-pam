// Import Moncash without type checking
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
const Moncash: any = require("moncash");


export const dynamic = 'force-static';

const moncash = new Moncash();

moncash.configure({
  mode: process.env.NEXT_PUBLIC_MON_CASH_SANDBOX, // 'sandbox' | 'live'
  clientId: process.env.NEXT_PUBLIC_MON_CASH_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_MON_CASH_CLIENT_SECRET,
});

export async function POST() {
  try {
    const payment = await new Promise((resolve, reject) => {
      moncash.payment.create(
        {
          amount: "50", // Ex: 50
          orderId: "32", // Must be unique
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (err:any, payment:any) => {
          if (err) {
            reject(err);
          } else {
            resolve(payment);
          }
        }
      );
    });

    const paymentURI = moncash.payment.redirectUri(payment);

    return Response.json({ paymentURI });
  } catch (error) {
    console.error("Payment creation failed:", error);
    return Response.json(
      { error: "Failed to create payment. Please try again later." },
      { status: 500 }
    );
  }
}
