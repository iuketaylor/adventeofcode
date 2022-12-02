import { readFileSync } from 'fs'
import { choiceMapper, resultsMapper, scoreMapper } from './mappers'
import { Player1Choice, Player2Choice, Results, Result, Game } from './types'

const input = readFileSync('./input.txt', 'utf-8').split('\n')

export function getResult (player1Choice: Player1Choice, player2Choice: Player2Choice, switchStrategies: boolean): Results  {
    if (switchStrategies) {
        return player2Choice === 'X' ? {
            player1Points: scoreMapper[player1Choice] + Result.Win,
            player2Points: scoreMapper[resultsMapper[player1Choice].win] + Result.Loss
        } : 
        player2Choice === 'Y' ? {
            player1Points: scoreMapper[player1Choice] + Result.Draw,
            player2Points: scoreMapper[resultsMapper[player1Choice].draw] + Result.Draw
        } : {
            player1Points: scoreMapper[player1Choice] + Result.Loss,
            player2Points: scoreMapper[resultsMapper[player1Choice].loss] + Result.Win
        }
    }

    return resultsMapper[player1Choice].draw === player2Choice ? {
        player1Points: scoreMapper[player1Choice] + Result.Draw,
        player2Points: scoreMapper[player2Choice] + Result.Draw
    } :
    resultsMapper[player1Choice].win === player2Choice ? {
        player1Points: scoreMapper[player1Choice] + Result.Win,
        player2Points: scoreMapper[player2Choice] + Result.Loss
    } :{
        player1Points: scoreMapper[player1Choice] + Result.Loss,
        player2Points: scoreMapper[player2Choice] + Result.Win
    }    
}

export function getFormattedGamesWithScores({switchStrategies}: {switchStrategies: boolean}): Array<Game> {
    return input.map(game => {        
        const [player1Choice, , player2Choice] = game.split('')

        const results = getResult(player1Choice as Player1Choice, player2Choice as Player2Choice, switchStrategies)

        return {
            player1Choice: choiceMapper[player1Choice],
            player2Choice: choiceMapper[player2Choice],
            scores: {
                player1Points: results?.player1Points,
                player2Points: results?.player2Points
            }
        }
    })
}

export function getPlayerTotalScore (games: Array<Game>) {
    let player1TotalScore = 0;
    let player2TotalScore = 0;

    for (let game of games) {
        player1TotalScore += game.scores.player1Points
        player2TotalScore += game.scores.player2Points
    }
    console.log({player1TotalScore, player2TotalScore})
}

const gamesPart1 = getFormattedGamesWithScores({switchStrategies: false})
const gamesPart2 = getFormattedGamesWithScores({switchStrategies: true})

getPlayerTotalScore(gamesPart1)
getPlayerTotalScore(gamesPart2)