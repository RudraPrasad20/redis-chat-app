import { Redis } from "@upstash/redis";

 export const db = new Redis({
     url: process.env.UPSTASH_REDIS_REST_URL,
     token: process.env.UPSTASH_REDIS_REST_TOKEN
 })

 async function fetchRedis(command: string, key: string) {
    return await db.get(key)
  }