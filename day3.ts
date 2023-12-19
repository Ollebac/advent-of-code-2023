import * as fs from 'node:fs';

function PartOne() {
    const inputFile = fs.readFileSync('./day3input.txt', 'utf8');
    
    let schematic: Array<string[]> = [];
    let column: number;
    const row = inputFile
    .split('\n')
    .reduce((row: number, line: string) => {
        line = line.trim();
        console.log(line);
        
        const currentLine = line.split("");
        if (!column) {
            column = currentLine.length;
        }
        schematic.push(currentLine)
        return row += 1;
    }, 0);
    
    console.log(row);    
    console.log(column);

    let sum: number = 0;
    let currentNum: string = '';
    let xStart: number, xEnd: number;

    function isValid (xStart: number, xEnd: number, yVal: number, inputEnd: boolean) : boolean {
        const symbols = /[-’/`~!#*$@_%+=,^&(){}[\]|;:”<>?\\]/;
        
        let yStart: number = yVal - 1;
        let yEnd: number = yVal + 1;
        if (yStart < 0) yStart = 0;
        if (inputEnd) yEnd = yVal;        

        for (let y = yStart; y <= yEnd; y++) {
            // console.log(schematic[y]);
            const line = schematic[y].join('').slice(xStart - 1, xEnd + 2);
            // console.log(`Searching this segment: ${line}`)
            if (symbols.test(line)) {
                // console.log(`matched a symbol on line ${y}`)
                return true;
            }
        }
        return false;
    }

    for (let y = 0; y < row; y++) {
        let inputEnd: boolean = false;
        if (y === row - 1) inputEnd = true;

        for (let x = 0; x < column; x++) {
            let current = schematic[y][x];
            if (Number.parseFloat(current) || Number.parseFloat(current) === 0) {
                currentNum = `${currentNum}${current}`;
                
                if (!xStart) {
                    xStart = x;
                }
                if (x === column - 1) {
                    // xStart = x - currentNum.length;
                    xEnd = x;
                    // console.log(`${currentNum} starts at ${xStart} and ends at ${xEnd}`);
                    if (isValid(xStart, xEnd, y, inputEnd)) {
                        console.log(`${currentNum} is a valid number`);
                        sum += Number.parseFloat(currentNum);
                    } else {
                        console.log(`${currentNum} is NOT valid number!!!!!`);
                    };       
                    currentNum = '';
                    xStart = 0, xEnd = 0;
                }
            } else if (currentNum) {
                // xStart = x - currentNum.length;
                xEnd = x - 1;
                // console.log(`${currentNum} starts at ${xStart} and ends at ${xEnd}`);
                if (isValid(xStart, xEnd, y, inputEnd)) {
                    console.log(`${currentNum} is a valid number`);
                    sum += Number.parseFloat(currentNum);
                } else {
                    console.log(`${currentNum} is NOT valid number!!!!!`);
                };  ;

                currentNum = '';
                xStart = 0, xEnd = 0;
            }
        }
    }

    console.log(sum);
    // console.log(schematic[0][1]);
}

function PartTwo() {
    
}

const start = performance.now();

PartOne(); 
// PartTwo(); 

const end = performance.now();
console.log(end - start);