const express = require("express");

const PORT = 3000;
const server = express();


server.use(express.static('src/views'));

server.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
})
