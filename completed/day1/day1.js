"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("node:fs");
function PartOne() {
    var inputFile = fs.readFileSync('./day1input.txt', 'utf8');
    var firstNum, tempNum;
    var sum = inputFile
        .split('\n')
        .reduce(function (runningSum, line) {
        for (var i = 0; i < line.length; i++) {
            var current = Number.parseFloat(line[i]);
            if (Number.isInteger(current)) {
                if (firstNum) {
                    tempNum = current;
                }
                else {
                    firstNum = current;
                    tempNum = current;
                }
            }
        }
        var currentSum = ("".concat(firstNum).concat(tempNum));
        return runningSum += Number.parseFloat(currentSum);
    }, 0);
    console.log(sum);
}
function PartTwo() {
    function getValueKey(object, value) {
        for (var prop in object) {
            if (value.includes(object[prop].toString().toLowerCase()))
                return prop;
        }
    }
    var inputFile = fs.readFileSync('./day1input.txt', 'utf8');
    var firstNum, lastNum;
    var stringNums = {
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
    };
    var sum = inputFile
        .split('\n')
        .reduce(function (runningSum, line) {
        var trimmedLine = line.trim();
        var text = '';
        var numFound = '';
        for (var i = 0; i < trimmedLine.length; i++) {
            var current = trimmedLine[i];
            if (Number.isInteger(Number.parseFloat(current))) {
                firstNum = current;
                break;
            }
            else {
                text = "".concat(text).concat(current);
                numFound = getValueKey(stringNums, text);
                if (numFound) {
                    firstNum = numFound;
                    break;
                }
            }
        }
        text = '';
        for (var i = trimmedLine.length - 1; i >= 0; i--) {
            var current = trimmedLine[i];
            if (Number.isInteger(Number.parseFloat(current))) {
                lastNum = current;
                break;
            }
            else {
                text = "".concat(current).concat(text);
                numFound = getValueKey(stringNums, text);
                if (numFound) {
                    lastNum = numFound;
                    break;
                }
            }
        }
        var currentSum = ("".concat(firstNum).concat(lastNum));
        // console.log(currentSum);
        return runningSum += Number.parseFloat(currentSum);
    }, 0);
    console.log(sum);
}
var start = performance.now();
// PartOne();
PartTwo();
var end = performance.now();
console.log(end - start);
