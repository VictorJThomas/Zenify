import { Redis, Requester } from '@upstash/redis';

interface CustomRequester extends Requester {
  url?: string;
}

export const db = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
} as unknown as Requester);
