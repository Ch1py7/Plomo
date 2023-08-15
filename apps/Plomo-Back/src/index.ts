import dotenv from 'dotenv'
import { client } from './client'
import { setTimeout } from './services/setTimeout'
import { CounterA, CounterB } from './utils'
import { Teams } from './utils/teams'

dotenv.config()
client.connect()

client.on('message', async (channel, tags, message) => {
  const [command, param1, param2] = message.split(' ')
  const currentNumber = parseInt(param1)
  const userID = parseInt(tags['user-id']!)

  const isUserInTeam1 = Teams.getPlayers(1).includes(userID)
  const isUserInTeam2 = Teams.getPlayers(2).includes(userID)
  const isUserBroadcaster = tags['user-id'] === tags['room-id']
  const teamCommand = command.toLowerCase()

  if (!isUserInTeam1 && !isUserInTeam2 && teamCommand === Teams.getTeamName(1)) {
    Teams.addPlayer(1, userID)
  } else if (!isUserInTeam1 && !isUserInTeam2 && teamCommand === Teams.getTeamName(2)) {
    Teams.addPlayer(2, userID)
  }

  if (isUserBroadcaster && teamCommand === '!teams' && param1 && param2) {
    Teams.setTeamName(1, param1)
    Teams.setTeamName(2, param2)
  }

  if (teamCommand === `!${Teams.getTeamName(1)}` && isUserInTeam1 && param1) {
    if (currentNumber === CounterA.getValue() + 1) {
      CounterA.increment()
    } else {
      Teams.removePlayer(1, userID)
      setTimeout(userID, currentNumber === 0 ? 1 : currentNumber)
      CounterA.reset()
    }
  }

  if (teamCommand === `!${Teams.getTeamName(2)}` && isUserInTeam2 && param1) {
    if (currentNumber === CounterB.getValue() + 1) {
      CounterB.increment()
    } else {
      Teams.removePlayer(2, userID)
      setTimeout(userID, currentNumber === 0 ? 1 : currentNumber)
      CounterB.reset()
    }
  }
})

