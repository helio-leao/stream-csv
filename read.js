import fs from "fs";
import { FILE_NAME } from "./constants.js";

const highWaterMark = 16 * 1024; // 16 KB chunks (default 64KB)

let fragment = ""; // to store any incomplete line
let total = 0;

console.log("Calculating...");
console.time("Elapsed time");

const reader = fs.createReadStream(FILE_NAME, { highWaterMark });

reader
  .on("data", (chunk) => {
    // Append the fragment (if exists) to the new chunk
    const data = fragment + chunk.toString();
    const lines = data.split("\n");

    // Process all complete lines (except the last one which might be incomplete)
    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i];
      const [, n] = line.split(",");
      total += parseInt(n) || 0;
    }

    // The last line might be incomplete, so save it as the fragment for the next batch
    fragment = lines[lines.length - 1];
  })
  .on("end", () => {
    // Process any remaining fragment (last incomplete line)
    if (fragment) {
      const [, n] = fragment.split(",");
      total += parseInt(n);
    }
    // Log result
    console.log("Total:", total);
    console.timeEnd("Elapsed time");
  });
