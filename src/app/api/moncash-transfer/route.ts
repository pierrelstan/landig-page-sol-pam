import { NextResponse } from "next/server";

const MONCASH_HOST = process.env.NEXT_PUBLIC_MON_CASH_HOST || ""; // e.g., https://sandbox.moncashbutton.digicelgroup.com/Api
const CLIENT_ID = process.env.NEXT_PUBLIC_MON_CASH_CLIENT_ID|| "";
const CLIENT_SECRET = process.env.NEXT_PUBLIC_MON_CASH_CLIENT_SECRET || "";

async function getAuthToken() {

  try {


    const response = await fetch(`${MONCASH_HOST}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username:CLIENT_ID,
        password: CLIENT_SECRET,
        scope:'read,write',
        grant_type: 'client_credentials',
      }).toString(),
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch access token: ${response.statusText}`);
    }
  
      const data = await response.json()

      return Response.json({ data })
  }
  catch(error){
console.log(error)
  }
  }

  
  

export async function POST(request: Request) {
  try {
    const { receiver, amount, desc,  } = await request.json();
    console.log(receiver, amount, desc)

    if (!receiver || !amount || !desc ) {
      return NextResponse.json(
        { error: 'missign!'},
        { status: 400 }
      );
    }

    // Get access token
    const token = await getAuthToken();

    // Make the payout request
    const payoutUrl = `${MONCASH_HOST}/v1/Transfert`;
    const response = await fetch(payoutUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        receiver,
        desc
         }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Failed to process payout", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
