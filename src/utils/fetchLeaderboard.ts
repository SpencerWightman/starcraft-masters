"use server";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { leaderboardSeason } from "@/constants/constants";

export async function fetchLeaderboard() {
  try {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const params = {
      TableName: process.env.AWS_TABLE,
      IndexName: "season-points-index",
      KeyConditionExpression: "season = :season",
      ExpressionAttributeValues: {
        ":season": { N: leaderboardSeason },
      },
      ScanIndexForward: false,
      Limit: 100,
    };

    const data = await client.send(new QueryCommand(params));

    return (data.Items ?? []).map((item) => ({
      username: item.username?.S ?? "||||||",
      team: (item.team?.L ?? []).map((m) => m.S || "||||||"),
      points: Number(item.points?.N ?? "0"),
    }));
  } catch {
    throw new Error("Leaderboard failed to fetch. Try again soon");
  }
}
