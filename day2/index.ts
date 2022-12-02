import { getFormattedGamesWithScores, getPlayerTotalScore } from './utils'

const gamesPart1 = getFormattedGamesWithScores({switchStrategies: false})
const gamesPart2 = getFormattedGamesWithScores({switchStrategies: true})

const scoresFromStrategy1 = getPlayerTotalScore(gamesPart1)
const scoresFromStrategy2 = getPlayerTotalScore(gamesPart2)

console.log(scoresFromStrategy1.player1TotalScore, scoresFromStrategy1.player2TotalScore)
console.log(scoresFromStrategy2.player1TotalScore, scoresFromStrategy2.player2TotalScore)
