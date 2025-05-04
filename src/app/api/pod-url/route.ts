import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/nextAuthOptions";
import {
  DynamoDBClient,
  GetItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userEmail = session.user?.email;
    if (!userEmail) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { url } = body;
    if (!url) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const tableName = process.env.AWS_TABLE_USERS;
    if (!tableName) {
      throw new Error("Missing user table name");
    }

    const getParams = {
      TableName: tableName,
      Key: {
        email: { S: session.email },
      },
      ProjectionExpression: "nextSubmission",
    };

    const now = Date.now();
    const nextAllowedSubmission = now + 24 * 60 * 60 * 1000;

    const result = await dynamoClient.send(new GetItemCommand(getParams));
    let nextSubmission = 0;
    if (
      result.Item &&
      result.Item.nextSubmission &&
      result.Item.nextSubmission.N
    ) {
      nextSubmission = Number(result.Item.nextSubmission.N);
    }

    if (nextSubmission && now < nextSubmission) {
      return NextResponse.json(
        { error: "You can submit once every 24 hours" },
        { status: 429 }
      );
    }

    const updateParams = {
      TableName: tableName,
      Key: {
        email: { S: session.email },
      },
      UpdateExpression: "SET nextSubmission = :next",
      ExpressionAttributeValues: {
        ":next": { N: nextAllowedSubmission.toString() },
      },
    };

    await dynamoClient.send(new UpdateItemCommand(updateParams));

    const backendResponse = await fetch(
      `${process.env.VOD_URL}/process-batch`,
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
      { message: "URL sent successfully", data, nextAllowedSubmission },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send URL" }, { status: 500 });
  }
}
