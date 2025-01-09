import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { leaderboardSeason } from "@/constants/constants";

export async function fetchLeaderboard() {
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

  try {
    const command = new QueryCommand(params);
    const data = await client.send(command);

    return (data.Items || []).map((item) => ({
      username: item.username?.S ?? "||||||",
      team: (item.team?.L ?? []).map((member) => member.S || "||||||"),
      points: parseInt(item.points?.N ?? "0", 10),
    }));
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw new Error("Failed to fetch leaderboard data");
  }
}
