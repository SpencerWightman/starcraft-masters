import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    console.log(process.env.POD_API_KEY as string);

    const backendResponse = await fetch(
      "https://bwl-vod.ngrok.app/process-batch",
      {
        method: "POST",
        headers: {
          "X-API-Key": process.env.POD_API_KEY as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      }
    );

    if (!backendResponse.ok) {
      throw new Error("Backend processing failed");
    }

    const data = await backendResponse.json();

    return NextResponse.json(
      { message: "URL sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send URL" }, { status: 500 });
  }
}
