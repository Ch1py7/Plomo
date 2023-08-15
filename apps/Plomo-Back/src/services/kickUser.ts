import axios from 'axios'
import { refreshToken } from './refreshToken'

export const kickUser = async (user_id: number, duration: number) => {
  const token = await refreshToken()
    
  const url = process.env.TWITCH_BAN_URL!

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID!,
      'Content-Type': 'application/json'
    }
  }

  const data = {
    data: {
      'user_id': user_id,
      'duration': duration,
      'reason': 'uwu'
    }
  }

  await axios.post(url, { ...data }, { ...config})
}
