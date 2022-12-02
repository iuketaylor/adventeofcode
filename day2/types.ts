export type Player1Choice = "A" | "B" | "C"
export type Player2Choice = "X" | "Y" | "Z"

export type Results = { player1Points: number, player2Points: number }
export type Game = {
    player1Choice: string;
    player2Choice: string;
    scores: {
        player1Points: number;
        player2Points: number;
    };
}

export enum Result  {
    Loss = 0,
    Draw = 3,
    Win = 6,
}