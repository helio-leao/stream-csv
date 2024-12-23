import fs from "fs";
import readline from "readline";

export default async function* readCsvRows(filename) {
  const reader = fs.createReadStream(filename);

  const rl = readline.createInterface({
    input: reader,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const row = line.split(",");
    yield row;
  }
}
