import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 7000;

app.use(bodyParser.json());

app.use(express.static(join(__dirname, "/dist")));

app.post("/save-board", (req, res) => {
  const data = req.body;
  const filePath = join(__dirname, "data", "game-one-boards.json");

  fs.readFile(filePath, (err, fileData) => {
    if (err && err.code === "ENOENT") {
      fs.writeFile(filePath, JSON.stringify([data], null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: "Error writing new file" });
        }
        return res.status(200).json({ message: "Data saved successfully!" });
      });
    } else if (err) {
      return res.status(500).json({ message: "Error reading file" });
    } else {
      const boards = JSON.parse(fileData.toString() || "[]");
      boards.push(data);

      fs.writeFile(filePath, JSON.stringify(boards, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: "Error writing file" });
        }
        res.status(200).json({ message: "Data saved successfully!" });
      });
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
