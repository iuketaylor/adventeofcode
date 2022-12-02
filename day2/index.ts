import { readFileSync } from 'fs'
const input = readFileSync('./input.txt', 'utf-8').split('\n')

type Results = { resultType: string, player1Points: number, player2Points: number }
type Player1Choice = "A" | "B" | "C"
type Player2Choice = "X" | "Y" | "Z"

enum Result  {
    Loss = 0,
    Draw = 3,
    Win = 6,
}

type Game = {
    player1Choice: string;
    player2Choice: string;
    result: string;
    scores: {
        player1Points: number;
        player2Points: number;
    };
}


const choiceMapper: Record<string, string> = {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissors',
    X: 'Rock',
    Y: 'Paper',
    Z: 'Scissors'
}

const scoreMapper: Record<string, number> = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3
}

const resultsMapper: Record<string, {draw: string, win: string, loss: string}> = {
    A: {
       draw: "X",
       win: "Z",
       loss: "Y"
    },
    B: {
        draw: "Y",
        win: "X",
        loss: "Z",
    },
    C: {
        draw:  "Z",
        win: "Y",
        loss: "X",
    },
}

function getResult (player1Choice: Player1Choice, player2Choice: Player2Choice): Results  {
    if (resultsMapper[player1Choice].draw === player2Choice) return {
        resultType: 'draw',
        player1Points: scoreMapper[player1Choice] + Result.Draw,
        player2Points: scoreMapper[player2Choice] + Result.Draw
    }
    if (resultsMapper[player1Choice].win === player2Choice) return {
        resultType: 'player 1 win',
        player1Points: scoreMapper[player1Choice] + Result.Win,
        player2Points: scoreMapper[player2Choice] + Result.Loss
    }
    if (resultsMapper[player1Choice].loss === player2Choice) return {
        resultType: 'player 2 win',
        player1Points: scoreMapper[player1Choice] + Result.Loss,
        player2Points: scoreMapper[player2Choice] + Result.Win
    }

    return {
        resultType: "unknown",
        player1Points: 0,
        player2Points: 0
    }
}

function getFormattedGamesWithScores(): Array<Game> {
    return input.map(game => {        
        const [player1Choice, , player2Choice] = game.split('')
        const { resultType, player1Points, player2Points } = getResult(player1Choice as Player1Choice, player2Choice as Player2Choice)

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

function getPlayerTotalScore (games: Array<Game>) {
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

const games = getFormattedGamesWithScores()
const {player1TotalScore, player2TotalScore} = getPlayerTotalScore(games)

console.log(player1TotalScore, player2TotalScore)