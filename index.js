const express = require("express");

const PORT = 3000;
const server = express();


server.get("/", (req, res) => {
  return res.send("Welcome to Inventory App");
})

server.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
})



