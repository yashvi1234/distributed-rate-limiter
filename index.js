const express = require("express");
const useClient = require("./src/string")
const app = express();

app.get('/', (req, res) => {
    useClient();
    res.send("Server is listening on port 3000");
})

app.listen(3000);