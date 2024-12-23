import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const params = {
    TableName: process.env.AWS_TABLE,
    Limit: 10,
  };

  try {
    const command = new ScanCommand(params);
    const data = await client.send(command);

    // console.log("Raw DynamoDB Response:", JSON.stringify(data, null, 2));

    const leaderboard = (data.Items || []).map((item) => ({
      username: item.teamName?.S ?? "||||||",
      team: (item.team?.L ?? []).map((member) => member.S || "||||||"),
      points: parseInt(item.points?.N ?? "0", 10),
    }));

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
