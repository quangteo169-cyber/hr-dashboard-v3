import fs from "fs";
import path from "path";
import Papa from "papaparse";

export const dynamic = "force-dynamic";

function transformData(rows) {
  return rows.map(row => ({
    date: row["B"],
    L0: !!row["B"],
    L1: row["P"] === "Pass",
    L2: row["Q"] === "Đồng ý",
    L3A: row["U"] === "Có" ? row["T"] : null,
    L4A: row["V"] === "Pass",
    L7: row["X"] === "Có",
    L8: row["Z"] === "Có" ? row["Y"] : null,
    L9: row["AA"] === "Có" ? row["AB"] : null,
  }));
}

function calculateLevels(data) {
  return {
    L0: data.filter(d => d.L0).length,
    L1: data.filter(d => d.L1).length,
    L2: data.filter(d => d.L2).length,
    L3A: data.filter(d => d.L3A).length,
    L4A: data.filter(d => d.L4A).length,
    L7: data.filter(d => d.L7).length,
    L8: data.filter(d => d.L8).length,
    L9: data.filter(d => d.L9).length,
  };
}

export async function GET() {
  const filePath = path.join(process.cwd(), "public/data/recruitment.csv");
  const file = fs.readFileSync(filePath, "utf8");

  const parsed = Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
  });

  const data = transformData(parsed.data);
  const levels = calculateLevels(data);

  return Response.json({ levels, data });
}
