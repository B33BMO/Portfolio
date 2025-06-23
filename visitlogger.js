const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 5050; // Or whatever

app.use(express.json());

app.post("/track", (req, res) => {
  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "unknown";
  const ua = req.headers["user-agent"] || "";
  const logEntry = `${new Date().toISOString()} | ${ip} | ${ua}\n`;
  fs.appendFileSync("visitlog.txt", logEntry);
  res.sendStatus(204);
});

app.listen(PORT, () => console.log(`IP logger listening on ${PORT}`));
