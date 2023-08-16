import { TeamProps } from 'src/types/Teams'

export module Teams {
  const firstTeam: TeamProps[] = []
  const secondTeam: TeamProps[] = []

  let firstTeamName: string
  let secondTeamName: string

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

  export const removePlayer = (team: boolean, { userID }: TeamProps) => {
    if (team) {
      firstTeam.splice(getPlayerIndexById(true, userID), 1)
    } else {
      secondTeam.splice(getPlayerIndexById(false, userID), 1)
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
