import fs from "fs";

const lineCount = 1e6; // the amount of lines the file will have

(async () => {
  console.log("Generating file...");
  console.time("Elapsed time");

  const writer = fs.createWriteStream("output.csv");

  for (let id = 0; id < lineCount; id++) {
    process.stdout.write(`\rLine ${id + 1}/${lineCount}`);
    const line = id === lineCount - 1 ? `${id},1` : `${id},1\n`;

    const canWrite = writer.write(line);
    if (!canWrite) {
      await new Promise((resolve) => writer.once("drain", resolve));
    }
  }
  writer.end();

  console.log("\nFinished!");
  console.timeEnd("Elapsed time");
})();
