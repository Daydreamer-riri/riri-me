import { bentoIns } from '../meta'

interface InsData {
  url: string
  data: {
    posts: { url: string, thumbnail: string }[]
    profile: string
    numPosts: number
    userName: string
    followers: number
    following: number
  }
}

export async function fetchBentoIns(): Promise<InsData> {
  const res = await fetch(bentoIns)
  return await res.json()
}
