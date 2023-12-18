import * as fs from 'node:fs';

function PartOne() {
    const inputFile = fs.readFileSync('./day2input.txt', 'utf8');
        
    // const alphaRegex = /(?=(red|green|blue))/g;
    const alphaRegex = /[\p{Letter}]+/gu;
    const numRegex = /\d+/g;

    const sum = inputFile
        .split('\n')
        .reduce((runningSum: number, line: string) => {
            // console.log(line);

            let colors: Record<string, number> = {
                red: 0,
                green: 0,
                blue: 0,
            }
            let game: number;
            let ongoingString: string = '';

            for (let i = 0; i < line.length; i++) {
                let current: string = line[i];
                ongoingString = `${ongoingString}${current}`;

                if (ongoingString.includes(':')) {
                    let tempNum = ongoingString.match(numRegex);
                    game = Number.parseFloat(tempNum[0]); 
                    ongoingString = '';
                }

                if (ongoingString.includes(',') || ongoingString.includes(';') || i == line.length - 1 ) {
                    let currentColor = ongoingString.match(alphaRegex);
                    let currentNum = ongoingString.match(numRegex);
                    colors[currentColor[0]] += Number.parseFloat(currentNum[0]); 
                    
                    if (ongoingString.includes(';') || i == line.length - 1) {
                        if (colors.red > 12 || colors.green > 13 || colors.blue > 14) {
                            break;
                        }

                        if (i == line.length - 1) {
                            return runningSum += game;
                        }
                        
                        colors = {
                            red: 0,
                            green: 0,
                            blue: 0,
                        }
                    }              
                    ongoingString = '';                 
                }
            }
            return runningSum;
        
        }, 0);        
    console.log(sum);    
}

function PartTwo() {
    const inputFile = fs.readFileSync('./day2input.txt', 'utf8');
        
    // const alphaRegex = /(?=(red|green|blue))/g;
    const alphaRegex = /[\p{Letter}]+/gu;
    const numRegex = /\d+/g;

    const sum = inputFile
        .split('\n')
        .reduce((runningSum: number, line: string) => {
            // console.log(line);

            let poweredColors: Record<string, number> = {
                red: 0,
                green: 0,
                blue: 0,
            };
            
            let currentColors: Record<string, number> = {
                red: 0,
                green: 0,
                blue: 0,
            };

            let ongoingString: string = '';

            for (let i = 0; i < line.length; i++) {
                let current: string = line[i];
                ongoingString = `${ongoingString}${current}`;

                if (ongoingString.includes(':')) {
                    ongoingString = '';
                }

                if (ongoingString.includes(',') || ongoingString.includes(';') || i == line.length - 1 ) {
                    let currentColor = ongoingString.match(alphaRegex);
                    let currentNum = ongoingString.match(numRegex);
                    currentColors[currentColor[0]] += Number.parseFloat(currentNum[0]);                     
                    
                    if (ongoingString.includes(';') || i == line.length - 1) {
                        if (currentColors.red > poweredColors.red) poweredColors.red = currentColors.red;
                        if (currentColors.green > poweredColors.green) poweredColors.green = currentColors.green;
                        if (currentColors.blue > poweredColors.blue) poweredColors.blue = currentColors.blue;

                        currentColors = {
                            red: 0,
                            green: 0,
                            blue: 0,
                        }

                        if (i == line.length - 1) {
                            // console.log(poweredColors);
                            return runningSum += (poweredColors.red * poweredColors.green * poweredColors.blue);
                        }
                    }
                    ongoingString = '';
                }
            }           
        }, 0);
    console.log(sum);   
}

const start = performance.now();

// PartOne(); //Run Time = Aprox 7ms
PartTwo(); //Run Time = Aprox 8ms

const end = performance.now();
console.log(end - start);