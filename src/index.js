import { FILE_NAME, OUTPUT_DIRECTORY_NAME } from "./constants/filePaths.js";
import readCsvRows from "./utils/readCsvRows.js";
import path from "path";

const filePath = path.join(OUTPUT_DIRECTORY_NAME, FILE_NAME);

let total = 0; // accumulator for 2nd column values
console.log("Calculating...");
console.time("Elapsed time");

for await (const row of readCsvRows(filePath)) {
  total += parseInt(row[1], 10) || 0;
}

console.log("Total:", total);
console.timeEnd("Elapsed time");
