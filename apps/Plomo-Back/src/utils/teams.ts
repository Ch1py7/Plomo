import { TeamProps } from 'src/types/Teams'
import { kickUser } from '../services/kickUser'

export module Teams {
  const firstTeam: TeamProps[] = []
  const firstBannedTeam: number[] = []
  const secondTeam: TeamProps[] = []
  const secondBannedTeam: number[] = []

  let firstTeamName: string
  let secondTeamName: string

  const getPlayersPercent = (team: number[]) => {
    return Math.ceil(team.length / 10)
  }

  export const getBanList = (team: boolean) => {
    if (team) {
      const availablePlayers = firstTeam.map(player => player.userID)
      for (let i = 0; i < getPlayersPercent(availablePlayers); i++) {
        const randomIndex = Math.floor(Math.random() * availablePlayers.length)
        firstBannedTeam.push(availablePlayers[randomIndex])
      }
      return firstBannedTeam
    } else {
      const availablePlayers = secondTeam.map(player => player.userID)
      for (let i = 0; i < getPlayersPercent(availablePlayers); i++) {
        const randomIndex = Math.floor(Math.random() * availablePlayers.length)
        secondBannedTeam.push(availablePlayers[randomIndex])
      }
      return secondBannedTeam
    }
  }

  export const resetBanList = (team: boolean) => {
    if (team) {
      firstBannedTeam.splice(0, firstBannedTeam.length)
    } else {
      secondBannedTeam.splice(0, secondBannedTeam.length)
    }
  }

  export const setTeamName = (team: boolean, name: string) => {
    if (team) {
      firstTeamName = name
    } else {
      secondTeamName = name
    }
  }

  export const getTeamName = (team: boolean) => {
    if (team) {
      return firstTeamName
    } else {
      return secondTeamName
    }
  }

  export const addPlayer = (team: boolean, { userID, userName }: TeamProps) => {
    const player = { userID, userName }

    if (team) {
      firstTeam.push(player)
    } else {
      secondTeam.push(player)
    }
  }

  export const getPlayerIndexById = (team: boolean, id: number) => {
    if (team) {
      return firstTeam.findIndex(player => player.userID === id)
    } else {
      return secondTeam.findIndex(player => player.userID === id)
    }
  }

  export const banPlayers = (team: boolean, currentNumber: number) => {
    if (team) {
      getBanList(true).forEach(userID => {
        kickUser(userID, currentNumber)
        firstTeam.splice(getPlayerIndexById(true, userID), 1)
      })
      resetBanList(true)
    } else {
      getBanList(false).forEach(userID => {
        kickUser(userID, currentNumber)
        secondTeam.splice(getPlayerIndexById(false, userID), 1)
      })
      resetBanList(false)
    }
  }

  export const getPlayers = (team: boolean) => {
    if (team) {
      return firstTeam
    } else {
      return secondTeam
    }
  }
}
