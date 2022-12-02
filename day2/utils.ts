import { readFileSync } from 'fs'
import {choiceMapper, resultsMapper, scoreMapper} from './mappers'
const input = readFileSync('./input.txt', 'utf-8').split('\n')

type Player1Choice = "A" | "B" | "C"
type Player2Choice = "X" | "Y" | "Z"

type Results = { resultType: string, player1Points: number, player2Points: number }
type Game = {
    player1Choice: string;
    player2Choice: string;
    result: string;
    scores: {
        player1Points: number;
        player2Points: number;
    };
}

enum Result  {
    Loss = 0,
    Draw = 3,
    Win = 6,
}

export function getResult2 (player1Choice: Player1Choice, player2Choice: Player2Choice): Results {
    if (player2Choice === 'X') {
        return {
            resultType: 'player 1 win',
            player1Points: scoreMapper[player1Choice] + Result.Win,
            player2Points: scoreMapper[resultsMapper[player1Choice].win] + Result.Loss
        }
    }

    if (player2Choice === 'Y') {
        return {
            resultType: 'draw',
            player1Points: scoreMapper[player1Choice] + Result.Draw,
            player2Points: scoreMapper[resultsMapper[player1Choice].draw] + Result.Draw
        }
    }

    if (player2Choice === 'Z') {
        return {
            resultType: 'player 2 win',
            player1Points: scoreMapper[player1Choice] + Result.Loss,
            player2Points: scoreMapper[resultsMapper[player1Choice].loss] + Result.Win
        }
    }

    return {
        resultType: "unknown",
        player1Points: 0,
        player2Points: 0
    }

}

export function getResult (player1Choice: Player1Choice, player2Choice: Player2Choice): Results  {
    if (resultsMapper[player1Choice].draw === player2Choice) {
        return {
            resultType: 'draw',
            player1Points: scoreMapper[player1Choice] + Result.Draw,
            player2Points: scoreMapper[player2Choice] + Result.Draw
        }
    } 

    if (resultsMapper[player1Choice].win === player2Choice) {
        return {
            resultType: 'player 1 win',
            player1Points: scoreMapper[player1Choice] + Result.Win,
            player2Points: scoreMapper[player2Choice] + Result.Loss
        }
    }

    if (resultsMapper[player1Choice].loss === player2Choice) {
        return {
            resultType: 'player 2 win',
            player1Points: scoreMapper[player1Choice] + Result.Loss,
            player2Points: scoreMapper[player2Choice] + Result.Win
        }
    }

    return {
        resultType: "unknown",
        player1Points: 0,
        player2Points: 0
    }
}

export function getFormattedGamesWithScores({switchStrategies}: {switchStrategies: boolean}): Array<Game> {
    return input.map(game => {        
        const [player1Choice, , player2Choice] = game.split('')
        const { resultType, player1Points, player2Points } = switchStrategies ? getResult2(player1Choice as Player1Choice, player2Choice as Player2Choice) : getResult(player1Choice as Player1Choice, player2Choice as Player2Choice)

        return {
            player1Choice: choiceMapper[player1Choice],
            player2Choice: choiceMapper[player2Choice],
            result: resultType,
            scores: {
                player1Points,
                player2Points
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

    return {
        player1TotalScore,
        player2TotalScore
    }
}