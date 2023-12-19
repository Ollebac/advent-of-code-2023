"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("node:fs");
function PartOne() {
    var inputFile = fs.readFileSync('./day3input.txt', 'utf8');
    var schematic = [];
    var column;
    var row = inputFile
        .split('\n')
        .reduce(function (row, line) {
        line = line.trim();
        console.log(line);
        var currentLine = line.split("");
        if (!column) {
            column = currentLine.length;
        }
        schematic.push(currentLine);
        return row += 1;
    }, 0);
    console.log(row);
    console.log(column);
    var sum = 0;
    var currentNum = '';
    var xStart, xEnd;
    function isValid(xStart, xEnd, yVal, inputEnd) {
        var symbols = /[-’/`~!#*$@_%+=,^&(){}[\]|;:”<>?\\]/;
        var yStart = yVal - 1;
        var yEnd = yVal + 1;
        if (yStart < 0)
            yStart = 0;
        if (inputEnd)
            yEnd = yVal;
        for (var y = yStart; y <= yEnd; y++) {
            // console.log(schematic[y]);
            var line = schematic[y].join('').slice(xStart - 1, xEnd + 2);
            // console.log(`Searching this segment: ${line}`)
            if (symbols.test(line)) {
                // console.log(`matched a symbol on line ${y}`)
                return true;
            }
        }
        return false;
    }
    for (var y = 0; y < row; y++) {
        var inputEnd = false;
        if (y === row - 1)
            inputEnd = true;
        for (var x = 0; x < column; x++) {
            var current = schematic[y][x];
            if (Number.parseFloat(current) || Number.parseFloat(current) === 0) {
                currentNum = "".concat(currentNum).concat(current);
                if (!xStart) {
                    xStart = x;
                }
                if (x === column - 1) {
                    // xStart = x - currentNum.length;
                    xEnd = x;
                    // console.log(`${currentNum} starts at ${xStart} and ends at ${xEnd}`);
                    if (isValid(xStart, xEnd, y, inputEnd)) {
                        console.log("".concat(currentNum, " is a valid number"));
                        sum += Number.parseFloat(currentNum);
                    }
                    else {
                        console.log("".concat(currentNum, " is NOT valid number!!!!!"));
                    }
                    ;
                    currentNum = '';
                    xStart = 0, xEnd = 0;
                }
            }
            else if (currentNum) {
                // xStart = x - currentNum.length;
                xEnd = x - 1;
                // console.log(`${currentNum} starts at ${xStart} and ends at ${xEnd}`);
                if (isValid(xStart, xEnd, y, inputEnd)) {
                    console.log("".concat(currentNum, " is a valid number"));
                    sum += Number.parseFloat(currentNum);
                }
                else {
                    console.log("".concat(currentNum, " is NOT valid number!!!!!"));
                }
                ;
                ;
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
var start = performance.now();
PartOne();
// PartTwo(); 
var end = performance.now();
console.log(end - start);
