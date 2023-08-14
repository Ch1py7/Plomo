import axios, { AxiosError } from 'axios'

export const refreshToken = async () => {
  try {
    const ID = process.env.TWITCH_CLIENT_ID
    const SECRET = process.env.TWITCH_CLIENT_SECRET
    const REFRESH_TOKEN = process.env.TWITCH_REFRESH_TOKEN
    const url = process.env.TWITCH_BOT_URL!

    const response = await axios.post(url, {
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
      client_id: ID,
      client_secret: SECRET
    })

    return response.data.access_token

  } catch (error) {
    const err = error as AxiosError
    console.log(err.response?.data)
  }
}