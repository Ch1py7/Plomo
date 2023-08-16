import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { client } from './client'
import { kickUser } from './services'
import { CounterA, CounterB, Teams } from './utils'

dotenv.config()
client.connect()

const server = createServer()
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

server.listen(3000)

io.on('connection', () => {
  io.emit('first_team', Teams.getPlayers(true))
  io.emit('second_team', Teams.getPlayers(false))
  io.emit('first_team_name', Teams.getTeamName(true))
  io.emit('second_team_name', Teams.getTeamName(false))
})

client.on('message', async (channel, tags, message) => {
  const [command, param1, param2] = message.split(' ')
  const currentNumber = parseInt(param1)
  const userID = parseInt(tags['user-id']!)
  const userName = tags['username']!
  const player = { userID, userName }

  const isUserInTeam1 = Teams.getPlayers(true).some(player => player.userID === userID && player.userName === userName)
  const isUserInTeam2 = Teams.getPlayers(false).some(player => player.userID === userID && player.userName === userName)
  const isUserBroadcaster = tags['user-id'] === tags['room-id']
  const teamCommand = command.toLowerCase()
  
  if (!isUserInTeam1 && !isUserInTeam2 && teamCommand === `!${Teams.getTeamName(true)}`) {
    Teams.addPlayer(true, player)
    io.emit('first_team', Teams.getPlayers(true))
  } else if (!isUserInTeam1 && !isUserInTeam2 && teamCommand === `!${Teams.getTeamName(false)}`) {
    Teams.addPlayer(false, player)
    io.emit('second_team', Teams.getPlayers(false))
  }

  if (isUserBroadcaster && teamCommand === '!teams' && param1 && param2) {
    Teams.setTeamName(true, param1)
    Teams.setTeamName(false, param2)
    io.emit('first_team_name', Teams.getTeamName(true))
    io.emit('second_team_name', Teams.getTeamName(false))
  }
  
  if (teamCommand === `!${Teams.getTeamName(true)}` && isUserInTeam1 && param1 && !tags.badges?.broadcaster) {
    if (currentNumber === CounterA.getValue() + 1) {
      CounterA.increment()
    } else {
      Teams.removePlayer(true, player)
      kickUser(userID, currentNumber === 0 ? 1 : currentNumber)
      io.emit('first_team', Teams.getPlayers(true))
      CounterA.reset()
    }
  }
  
  if (teamCommand === `!${Teams.getTeamName(false)}` && isUserInTeam2 && param1 && !tags.badges?.broadcaster) {
    if (currentNumber === CounterB.getValue() + 1) {
      CounterB.increment()
    } else {
      Teams.removePlayer(false, player)
      kickUser(userID, currentNumber === 0 ? 1 : currentNumber)
      io.emit('second_team', Teams.getPlayers(false))
      CounterB.reset()
    }
  }
})
