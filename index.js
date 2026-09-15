const express = require("express");
const fixedWindow = require("./src/fixedWindowRL");
const app = express();

app.get('/', async (req, res) => {
   const {allowed, remaining} = await fixedWindow(1, 60, 5);
   console.log('allowed', allowed);
    res.send("Server is listening on port 3000");
})

app.listen(3000);