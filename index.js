const express = require("express");
const fixedWindow = require("./src/fixedWindowRL");
const tokenBucket = require("./src/tokenBucketRL");
const app = express();

app.get('/', async (req, res) => {
   const {allowed, remaining} = await fixedWindow(1, 60, 5);
   console.log('allowedFW', allowed, " ", 'remainingFW', remaining);
    res.send("Server is listening on port 3000");
})

app.get('/profile', async (req, res) => {
   const {allowed, remaining} = await tokenBucket(1, 5, 1);
   console.log('allowedTB', allowed, ' ', 'remainingTB', remaining);
    res.send("This is profile page 1");
})

app.listen(3000);