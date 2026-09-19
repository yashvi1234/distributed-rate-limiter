const client = require("./connect.js");

const TOCKEN_BUCKET_SCRICPT = `
local key = KEYS[1]
local bucketSize = tonumber(ARGV[1])
local currentTime = tonumber(ARGV[2])
local refillRate = tonumber(ARGV[3])

local bucket = redis.call('HMGET', key, 'token', 'lastRefill')
local token = tonumber(bucket[1])
local lastRefill = tonumber(bucket[2])

if token == nil or lastRefill == nil then 
    token = bucketSize
    lastRefill = currentTime
end

local elapsedTime = math.max(0, currentTime-lastRefill)
local tokenToBeRefilled = elapsedTime*refillRate

token = math.min(bucketSize, tokenToBeRefilled+token)

local allowed = 0
if token > 0 then 
   token = token - 1
   allowed = 1
end

redis.call('HMSET', key, 'token', token, 'lastRefill', currentTime)
redis.call('EXPIRE', key, math.ceil(bucketSize/refillRate)+10)

return {allowed, token}
`

async function tokenBucket(clientId, bucketSize, refillRate){
    const key = `token:${clientId}`;
    const currentTime = Date.now()/1000;
    const result = await client.eval(TOCKEN_BUCKET_SCRICPT, 1, key, bucketSize, currentTime, refillRate);

    const [allowed, token] = result;

    return {
        allowed: allowed === 1,
        remaining: Math.floor(token)
    };
}

module.exports = tokenBucket;