import { readFileSync } from 'fs'

const input = readFileSync('./input.txt', 'utf-8').split('\n\n')

const caloriesPerElf = input.map((elfCals) => {
  return  elfCals.split('\n').map(a => +a)
})

const totals = caloriesPerElf.map(calories => {
  return calories.reduce((a,b) => a + b)
}).sort((a,b) => a < b ? 1 : -1)


const highestTotalCalories = totals[0];
const threeHighestTotalCalories = totals.slice(0,3).reduce((a,b) => a + b)

console.log({highestTotalCalories, threeHighestTotalCalories})