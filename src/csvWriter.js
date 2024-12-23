import fs from "fs";
import { FILE_NAME, OUTPUT_DIRECTORY_NAME } from "./constants/filePaths.js";
import { percentual } from "./utils/calculations.js";
import path from "path";

const lineCount = 1e6; // the amount of rows the file will have

(async () => {
  console.log("Generating file...");
  console.time("Elapsed time");

  fs.mkdirSync(OUTPUT_DIRECTORY_NAME, { recursive: true });
  const writer = fs.createWriteStream(
    path.join(OUTPUT_DIRECTORY_NAME, FILE_NAME)
  );

  for (let id = 0; id < lineCount; id++) {
    process.stdout.write(`\r${percentual(id + 1, lineCount).toFixed(1)}%`);
    const canWrite = writer.write(`${id},1\n`);

    if (!canWrite) {
      await new Promise((resolve) => writer.once("drain", resolve));
    }
  }
  writer.end();

  console.log("\nFinished!");
  console.timeEnd("Elapsed time");
})();
