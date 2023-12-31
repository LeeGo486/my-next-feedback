import Redis from "ioredis";
import {NextResponse} from "next/server";
import {rateLimit} from "@/lib/redis";

const redisKey = "xwp_"
export async function POST(req: Request) {
  const redisKey = "xwp_" + (req.headers.get('x-real-ip') ? req.headers.get('x-real-ip') : req.headers.get('x-forwarded-for'))
  const redis = new Redis(process.env.REDIS_URL as string)
  const param = await req.json()

  //Up-stash rate limit
  const {success} = await rateLimit.limit(redisKey)
  if (!success) {
    return NextResponse.json({message: 'Too Many Requests'}, {status: 429})
  }

  await Promise.all([redis.set(redisKey, JSON.stringify(param))])
  redis.quit()

  return NextResponse.json({message: 'Success.'}, {status: 200})
}


