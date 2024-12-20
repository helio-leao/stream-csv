import fs from "fs";
import { FILE_NAME } from "./constants.js";
import { percentual } from "./utils.js";

const lineCount = 1e6; // the amount of rows the file will have

(async () => {
  console.log("Generating file...");
  console.time("Elapsed time");

  const writer = fs.createWriteStream(FILE_NAME);

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
