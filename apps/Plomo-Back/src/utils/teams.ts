export module Teams {
  const firstTeam: number[] = []
  const secondTeam: number[] = []

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

  export const addPlayer = (team: number, playerId: number) => {
    if (team === 1) {
      firstTeam.push(playerId)
    } else {
      secondTeam.push(playerId)
    }
  }

  export const removePlayer = (team: number, playerId: number) => {
    if (team === 1) {
      firstTeam.splice(firstTeam.indexOf(playerId), 1)
    } else {
      secondTeam.splice(secondTeam.indexOf(playerId), 1)
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
