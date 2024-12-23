import fs from "fs";
import { FILE_NAME } from "./constants.js";

let total = 0; // accumulator for 2nd column values

console.log("Calculating...");
console.time("Elapsed time");

const highWaterMark = 16 * 1024; // 16 KB chunks (default 64KB)
const reader = fs.createReadStream(FILE_NAME, { highWaterMark });

let fragment = ""; // to store any incomplete line

reader
  .on("data", (chunk) => {
    // Append the fragment (if exists) to the new chunk
    const data = fragment + chunk.toString();
    const rows = data.split("\n");

    // Process all complete lines (except the last one which might be incomplete)
    for (let i = 0; i < rows.length - 1; i++) {
      const row = rows[i];
      // PROCESSING CODE
      const [_, value] = row.split(",");
      total += parseInt(value, 10) || 0;
    }

    // The last line might be incomplete, so save it as the fragment for the next batch
    fragment = rows[rows.length - 1];
  })
  .on("end", () => {
    // Process last line if it exists
    if (fragment) {
      // PROCESSING CODE
      const [_, value] = row.split(",");
      total += parseInt(value, 10) || 0;
    }

    // Log result
    console.log("Total:", total);
    console.timeEnd("Elapsed time");
  });
