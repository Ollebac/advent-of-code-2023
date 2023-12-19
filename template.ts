import * as fs from 'node:fs';

function PartOne() {
    const inputFile = fs.readFileSync('./dayXinput.txt', 'utf8');
        
    const sum = inputFile
        .split('\n')
        .reduce((runningSum: number, line: string) => {
            console.log(line);

            return runningSum;
        
        }, 0);
                
    console.log(sum);    
}

function PartTwo() {
    
}

const start = performance.now();

// PartOne(); 
// PartTwo(); 

const end = performance.now();
console.log(end - start);