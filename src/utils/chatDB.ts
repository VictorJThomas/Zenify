import { Redis, Requester } from '@upstash/redis'

export const db = new Redis({
    url: "https://us1-select-phoenix-41475.upstash.io", //process.env.UPSTASH_REDIS_REST_URL
    token: "AaIDASQgZTFiNjYwNzMtZDc1Zi00YjgzLTg0YjEtNDk4NDM2YzUwYWI4MjA0N2E4NGFlMzE1NGFiYzk3NTY4MjZjNWViNzIzZGY=" //process.env.UPSTASH_REDIS_REST_TOKEN
})