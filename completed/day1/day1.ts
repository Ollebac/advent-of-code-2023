import * as fs from 'node:fs';

function PartOne() {
    const inputFile = fs.readFileSync('./day1input.txt', 'utf8');
    
    let firstNum: number, tempNum: number;
    
    const sum = inputFile
        .split('\n')
        .reduce((runningSum: number, line: string) => {
            for ( let i = 0; i < line.length; i++) {
                let current = Number.parseFloat(line[i])
                if (Number.isInteger(current)) {
                    if (firstNum) {
                        tempNum = current;
                    } else {
                        firstNum = current;
                        tempNum = current;
                    }
                }
            }
            let currentSum: string = (`${firstNum}${tempNum}`);
            return runningSum += Number.parseFloat(currentSum);
        }, 0);
    
    console.log(sum);
}

function PartTwo() {
    function getValueKey(object, value) {
        for (let prop in object) {
            if (value.includes(object[prop].toString().toLowerCase()))
                return prop;
        }
    }

    const inputFile = fs.readFileSync('./day1input.txt', 'utf8');
    let firstNum: string, lastNum: string;
    let stringNums: object = {
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
    }

    const sum = inputFile
        .split('\n')
        .reduce((runningSum: number, line: string) => {
            let trimmedLine = line.trim();

            let text: string = '';
            let numFound: string = '';

            for ( let i = 0; i < trimmedLine.length; i++) {
                let current = trimmedLine[i];
                if (Number.isInteger(Number.parseFloat(current))) {
                    firstNum = current;
                    break;
                } else {
                    text = `${text}${current}`;
                    numFound = getValueKey(stringNums, text);
                    if (numFound) {
                        firstNum = numFound;
                        break;
                    }
                }
            }

            text = '';
            for ( let i = trimmedLine.length - 1; i >= 0; i--) {
                let current = trimmedLine[i];
                if (Number.isInteger(Number.parseFloat(current))) {
                    lastNum = current;
                    break;
                } else {
                    text = `${current}${text}`;
                    numFound = getValueKey(stringNums, text);
                    if (numFound) {
                        lastNum = numFound;
                        break;
                    }
                } 
            }

            let currentSum: string = (`${firstNum}${lastNum}`);
            // console.log(currentSum);
            return runningSum += Number.parseFloat(currentSum);
        }, 0);
    
    console.log(sum);
}

const start = performance.now();

// PartOne();
PartTwo();

const end = performance.now();
console.log(end - start);