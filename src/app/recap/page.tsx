import fs from "fs";
import path from "path";
import { RecapType } from "@/app/types/teamTypes";
import RecapClient from "./RecapClient";

export default function RecapPage() {
  const dir = path.join(process.cwd(), "data", "recap");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const initialFile = files[0];
  const initialData = JSON.parse(
    fs.readFileSync(path.join(dir, initialFile), "utf-8")
  ) as RecapType;

  return (
    <RecapClient
      files={files}
      initialFile={initialFile}
      initialData={initialData}
    />
  );
}
