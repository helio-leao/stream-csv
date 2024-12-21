import fs from "fs";
import { FILE_NAME } from "./constants.js";

// PROCESSING DATA BLOCK
// this is the part that could be changed for other files with other types of requirements
let total = 0;

function processRow(row) {
  const [_, value] = row.split(",");
  const number = parseInt(value, 10);
  if (!Number.isNaN(number)) {
    total += number;
  }
}

// STREAM READING BLOCK
const highWaterMark = 16 * 1024; // 16 KB chunks (default 64KB)

let fragment = ""; // to store any incomplete line

console.log("Calculating...");
console.time("Elapsed time");

const reader = fs.createReadStream(FILE_NAME, { highWaterMark });

reader
  .on("data", (chunk) => {
    // Append the fragment (if exists) to the new chunk
    const data = fragment + chunk.toString();
    const rows = data.split("\n");

    // Process all complete lines (except the last one which might be incomplete)
    for (let i = 0; i < rows.length - 1; i++) {
      const row = rows[i];
      // THE PROCESSING CODE HERE
      processRow(row);
    }

    // The last line might be incomplete, so save it as the fragment for the next batch
    fragment = rows[rows.length - 1];
  })
  .on("end", () => {
    // Process last line if it exists
    if (fragment) {
      // REPEAT THE PROCESSING CODE HERE
      processRow(fragment);
    }

    // Log result
    console.log("Total:", total);
    console.timeEnd("Elapsed time");
  });
