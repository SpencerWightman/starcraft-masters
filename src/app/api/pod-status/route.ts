import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const job_id = searchParams.get("job_id");

  if (!job_id) {
    return NextResponse.json(
      { error: "Invalid input: job_id is required" },
      { status: 400 }
    );
  }

  const backendUrl = `${
    process.env.VOD_URL
  }/job-status?job_id=${encodeURIComponent(job_id)}`;

  const backendResponse = await fetch(backendUrl, {
    method: "GET",
    headers: {
      "X-API-Key": process.env.POD_API_KEY as string,
      "Content-Type": "application/json",
    },
  });

  if (!backendResponse.ok) {
    return NextResponse.json(
      { error: "Job not found or backend error" },
      { status: backendResponse.status }
    );
  }

  const data = await backendResponse.json();

  return NextResponse.json(
    { message: "Job status retrieved successfully", data },
    { status: 200 }
  );
}
