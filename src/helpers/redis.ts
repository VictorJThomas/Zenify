import { Redis } from "@upstash/redis";

const upstashRedisRestUrl = "https://us1-select-phoenix-41475.upstash.io" //process.env.UPSTASH_REDIS_REST_URL
const authToken = "AaIDASQgZTFiNjYwNzMtZDc1Zi00YjgzLTg0YjEtNDk4NDM2YzUwYWI4MjA0N2E4NGFlMzE1NGFiYzk3NTY4MjZjNWViNzIzZGY=" //process.env.UPSTASH_REDIS_TOKEN

type Command = 'zrange' | 'sismember' | 'get' | 'smembers' | 'set'

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`

  console.log('Redis Command:', commandUrl);

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    console.error('Error executing Redis command:', response.statusText);
    throw new Error(`Error executing Redis command: ${response.statusText}`)
  }

  const data = await response.json()
  console.log('Redis Response:', data);

  return data.result
}

