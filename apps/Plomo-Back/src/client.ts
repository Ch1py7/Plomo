import tmi from 'tmi.js'

export const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_PASSWORD
  },
  channels: [ 'bulbsum' ]
})