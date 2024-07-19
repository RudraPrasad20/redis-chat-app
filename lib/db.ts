import { Redis } from "@upstash/redis";

export const db = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
export async function fetchRedis(command: string, key: string) {
  try {
    const result = await db.get(key);
    return result;
  } catch (error) {
    console.error("Error fetching from Redis:", error);
    throw error; // Propagate the error
  }
}
