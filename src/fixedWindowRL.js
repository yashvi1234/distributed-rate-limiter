const client = require("./connect.js");

async function fixedWindow(clientId, fixedSlot, limit){
    const key = `fixed:${clientId}`;
    const count = await client.incr(key);

    if(count === 1){
        await client.expire(key, fixedSlot);
    }

    return {allowed: count<=limit, remaining: Math.max(0, limit-count)};
}

// async function callFixedWindow(){
//     for(let i=0; i<6; ++i){
//         let { allowed, remaining } = await fixedWindow(1, 60, 5);

//     }

module.exports = fixedWindow;