import { fetchRedis } from './redis';

export const getProsByUserId = async (userId: string) => {
  const proIds = (await fetchRedis(
    'smembers',
    `user:${userId}:pros`
  )) as string[];

  const pros = await Promise.all(
    proIds.map(async (proId) => {
      const pro = await fetchRedis('get', `user:${proId}`) as string;
      const parsedPro = JSON.parse(pro) as User;
      return parsedPro;
    })
  );

  return pros;
};