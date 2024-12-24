# Node Streams Project

This project demonstrates the use of Node.js streams and readline for efficiently reading and writing large amounts of data to a file. It consists of two scripts: one for generating a file with a specified number of rows (`write.js`) and another for reading and processing the file (`read.js`).

## Features

- **Write Script**: Generates a large file with rows in the format `id,value`.
- **Read Script**: Reads the file line by line, and calculates the sum of all values.
- Efficient handling of large files using Node.js streams and readline.

## Prerequisites

- Node.js installed on your system.

## Setup

1. Clone the repository.
2. Install dependencies (if any) using:
   ```bash
   npm install
   ```

## Usage

### Write Script

The write script generates a file with 1,000,000 rows by default.

To run the write script, use:

```bash
npm run write
```

This will create a file named `output.csv` in the project directory.

### Read Script

The read script processes the generated file, calculating the total sum of the second column.

To run the read script, use:

```bash
npm run read
```

You will see the total sum and the elapsed time for processing.

## How It Works

### Write Script (`write.js`)

1. A `WriteStream` is created to write data to `output.csv`.
2. It generates rows in the format `id,1` and writes them to the file in batches.
3. Backpressure is handled using the `drain` event.

### Read Script (`read.js`)

1. A `ReadStream` is created to read `data.txt`.
2. The file is read line by line using the `readline` object.
3. The total sum and elapsed time are logged at the end.

## Notes

- Adjust the `lineCount` constant in `write.js` to control the number of rows generated.
- Modify the `highWaterMark` value in `read.js` to experiment with different chunk sizes.
