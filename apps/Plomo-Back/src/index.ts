import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { client } from './client'
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
  const [command, param1, param2, param3] = message.split(' ')
  const currentNumber = parseInt(param1)
  const userID = parseInt(tags['user-id']!)
  const userName = tags['username']!
  const player = { userID, userName }

  const isUserInTeam1 = Teams.getPlayers(true).some(player => player.userID === userID && player.userName === userName)
  const isUserInTeam2 = Teams.getPlayers(false).some(player => player.userID === userID && player.userName === userName)
  const isUserBroadcaster = tags['user-id'] === tags['room-id']
  const teamCommand = command.toLowerCase()
  
  // add player to team
  if (!isUserInTeam1 && !isUserInTeam2 && teamCommand === `!${Teams.getTeamName(true)}` && !tags.badges?.broadcaster) {
    Teams.addPlayer(true, player)
    io.emit('first_team', Teams.getPlayers(true))
  } else if (!isUserInTeam1 && !isUserInTeam2 && teamCommand === `!${Teams.getTeamName(false)}` && !tags.badges?.broadcaster) {
    Teams.addPlayer(false, player)
    io.emit('second_team', Teams.getPlayers(false))
  }

  // set teams names and goals
  if (isUserBroadcaster && teamCommand === '!teams' && param1 && param2 && parseInt(param3)) {
    Teams.setTeamName(true, param1)
    CounterA.setGoal(parseInt(param3))
    Teams.setTeamName(false, param2)
    CounterB.setGoal(parseInt(param3))
    io.emit('first_team_name', Teams.getTeamName(true))
    io.emit('second_team_name', Teams.getTeamName(false))
  }
  
  // ban players
  if (teamCommand === `!${Teams.getTeamName(true)}` && isUserInTeam1 && parseInt(param1) && !tags.badges?.broadcaster) {
    if (currentNumber === CounterA.getValue() + 1) {
      CounterA.increment()
      if (currentNumber === CounterA.getGoal()) {
        CounterA.reset()
        Teams.banTeam(false, CounterA.getGoal())
      }
    } else {
      Teams.banPlayers(true, currentNumber)
      io.emit('first_team', Teams.getPlayers(true))
      CounterA.reset()
    }
  }
  
  if (teamCommand === `!${Teams.getTeamName(false)}` && isUserInTeam2 && parseInt(param1) && !tags.badges?.broadcaster) {
    if (currentNumber === CounterB.getValue() + 1) {
      CounterB.increment()
      if (currentNumber === CounterB.getGoal()) {
        CounterB.reset()
        Teams.banTeam(true, CounterB.getGoal())
      }
    } else {
      Teams.banPlayers(false, currentNumber)
      io.emit('second_team', Teams.getPlayers(false))
      CounterB.reset()
    }
  }
})
