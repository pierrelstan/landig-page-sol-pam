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


export async function POST(request: Request) {
    const { receiver, amount, desc } = await request.json();

    try {
        // Assume moncash.transfert.create() is an async function
        const transferResponse = await moncash.transfert.create({
            receiver,
            amount,
            desc,
        });

        console.log(transferResponse);
        return Response.json({ success: true, data: transferResponse });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error('Error during transfer:', err);
        return Response.json({ success: false, error: err.message }, { status: 500 });
    }
}
