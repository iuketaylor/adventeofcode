import { readFileSync } from "fs";

const input = readFileSync('./input.txt', 'utf-8').split('\n')
const priorty = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')


function getPriorityValues(input: string[]) {
    return input.map(string =>  {
        const firstHalf = string.slice(0, string.length / 2)
        const secondHalf = string.slice(firstHalf.length, string.length)
        const intersection = getIntersection(firstHalf, secondHalf)
        return priorty.indexOf(intersection) + 1
    })
}

function getIntersection(firstHalf: string, secondHalf: string) {
    const set1 = new Set(firstHalf);
    const set2 = new Set(secondHalf);
    
    return [...new Set([...set1].filter((value) => set2.has(value)))][0];
}


const priorityValues = getPriorityValues(input)
const total = priorityValues.reduce((a,b) => a + b);
console.log(total)