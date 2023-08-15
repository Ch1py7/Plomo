import { TeamProps } from 'src/types/Teams'

export module Teams {
  const firstTeam: TeamProps[] = []
  const secondTeam: TeamProps[] = []

  let firstTeamName: string
  let secondTeamName: string

  export const setTeamName = (team: number, name: string) => {
    if (team === 1) {
      firstTeamName = name
    } else {
      secondTeamName = name
    }
  }

  export const getTeamName = (team: number) => {
    if (team === 1) {
      return firstTeamName
    } else {
      return secondTeamName
    }
  }

  export const addPlayer = (team: number, { userID, userName }: TeamProps) => {
    const player = { userID, userName }

    if (team === 1) {
      firstTeam.push(player)
    } else {
      secondTeam.push(player)
    }
  }

  export const removePlayer = (team: number, userID: number, userName: string) => {
    const player = { userID, userName }

    if (team === 1) {
      firstTeam.splice(firstTeam.indexOf(player), 1)
    } else {
      secondTeam.splice(secondTeam.indexOf(player), 1)
    }
  }

  export const getPlayers = (team: number) => {
    if (team === 1) {
      return firstTeam
    } else {
      return secondTeam
    }
  }
}
