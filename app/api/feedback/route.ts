import Redis from "ioredis";
import {NextResponse} from "next/server";
import {rateLimit} from "@/lib/redis";

const redisKey = "xwp_"
export async function POST(req: Request) {
  const redis = new Redis(process.env.REDIS_URL as string)
  const param = await req.json()

  //Up-stash rate limit
  const {success} = await rateLimit.limit(redisKey)
  if (!success) {
    return NextResponse.json({message: 'Too Many Requests'}, {status: 429})
  }

  redis.set(redisKey, JSON.stringify(param))
  redis.quit()

  return NextResponse.json({message: 'Too Many Requests'}, {status: 200})
}


