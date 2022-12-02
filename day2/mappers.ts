type ResultsMapper = Record<string, {draw: string, win: string, loss: string}>

export const choiceMapper: Record<string, string> = {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissors',
    X: 'Rock',
    Y: 'Paper',
    Z: 'Scissors'
}

export const scoreMapper: Record<string, number> = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3
}

export const resultsMapper: ResultsMapper = {
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
