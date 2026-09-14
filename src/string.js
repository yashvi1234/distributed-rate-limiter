const client = require("./connect.js");

async function useClient() {
    await client.set("a", 1);
    const result = await client.get("a");
    console.log("result", result);
}

module.exports = useClient;