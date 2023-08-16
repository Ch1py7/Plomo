import { FC, ReactElement, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

interface TeamProps {
  userID: number
  userName: string
}

export const App: FC = (): ReactElement => {
  const [firstTeam, setFirstTeam] = useState<TeamProps[]>([])
  const [firstTeamName, setFirstTeamName] = useState<string>('')
  const [secondTeam, setSecondTeam] = useState<TeamProps[]>([])
  const [secondTeamName, setSecondTeamName] = useState<string>('')
  
  useEffect(() => {
    const socket = io('http://localhost:3000/')
    socket.connect()
    socket.on('first_team', (arg1: TeamProps[]) => {
      setFirstTeam(arg1)
    })
    socket.on('first_team_name', (arg1: string) => {
      setFirstTeamName(arg1)
    })
    socket.on('second_team', (arg1: TeamProps[]) => {
      setSecondTeam(arg1)
    })
    socket.on('second_team_name', (arg1: string) => {
      setSecondTeamName(arg1)
    })
  }, [])

  return (
    <div className='flex'>
      <div>
        <h1 className='text-blue'>{ firstTeamName }:</h1>
        <ul>
          {firstTeam.map((player) => (
            <li key={player.userID}>{player.userName}</li>
          ))}
        </ul>
      </div>
      <div>
        <h1>{ secondTeamName }:</h1>
        <ul>
          {secondTeam.map((player) => (
            <li key={player.userID}>{player.userName}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
