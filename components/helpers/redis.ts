const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!upstashRedisRestUrl || !authToken) {
  throw new Error("Missing Redis configuration in environment variables.");
}

type Command = "zrange" | "sismember" | "get" | "smembers";

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join("/")}`;

  try {
    const response = await fetch(commandUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Error executing Redis command: ${response.statusText}`);
      throw new Error(`Error executing Redis command: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error(`Fetch Redis error:`, error);
    throw error;
  }
}
