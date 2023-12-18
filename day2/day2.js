"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("node:fs");
function PartOne() {
    var inputFile = fs.readFileSync('./day2input.txt', 'utf8');
    // const alphaRegex = /(?=(red|green|blue))/g;
    var alphaRegex = /[\p{Letter}]+/gu;
    var numRegex = /\d+/g;
    var sum = inputFile
        .split('\n')
        .reduce(function (runningSum, line) {
        // console.log(line);
        var colors = {
            red: 0,
            green: 0,
            blue: 0,
        };
        var game;
        var ongoingString = '';
        for (var i = 0; i < line.length; i++) {
            var current = line[i];
            ongoingString = "".concat(ongoingString).concat(current);
            if (ongoingString.includes(':')) {
                var tempNum = ongoingString.match(numRegex);
                game = Number.parseFloat(tempNum[0]);
                ongoingString = '';
            }
            if (ongoingString.includes(',') || ongoingString.includes(';') || i == line.length - 1) {
                var currentColor = ongoingString.match(alphaRegex);
                var currentNum = ongoingString.match(numRegex);
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
                    };
                }
                ongoingString = '';
            }
        }
        return runningSum;
    }, 0);
    console.log(sum);
}
function PartTwo() {
    var inputFile = fs.readFileSync('./day2input.txt', 'utf8');
    // const alphaRegex = /(?=(red|green|blue))/g;
    var alphaRegex = /[\p{Letter}]+/gu;
    var numRegex = /\d+/g;
    var sum = inputFile
        .split('\n')
        .reduce(function (runningSum, line) {
        // console.log(line);
        var poweredColors = {
            red: 0,
            green: 0,
            blue: 0,
        };
        var currentColors = {
            red: 0,
            green: 0,
            blue: 0,
        };
        var ongoingString = '';
        for (var i = 0; i < line.length; i++) {
            var current = line[i];
            ongoingString = "".concat(ongoingString).concat(current);
            if (ongoingString.includes(':')) {
                ongoingString = '';
            }
            if (ongoingString.includes(',') || ongoingString.includes(';') || i == line.length - 1) {
                var currentColor = ongoingString.match(alphaRegex);
                var currentNum = ongoingString.match(numRegex);
                currentColors[currentColor[0]] += Number.parseFloat(currentNum[0]);
                if (ongoingString.includes(';') || i == line.length - 1) {
                    if (currentColors.red > poweredColors.red)
                        poweredColors.red = currentColors.red;
                    if (currentColors.green > poweredColors.green)
                        poweredColors.green = currentColors.green;
                    if (currentColors.blue > poweredColors.blue)
                        poweredColors.blue = currentColors.blue;
                    currentColors = {
                        red: 0,
                        green: 0,
                        blue: 0,
                    };
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
var start = performance.now();
PartOne();
// PartTwo(); //Run Time = Aprox 8ms
var end = performance.now();
console.log(end - start);
