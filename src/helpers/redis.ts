const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL 
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN 

type Command = 'zrange' | 'sismember' | 'get' | 'smembers' | 'set' | 'spro'

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

