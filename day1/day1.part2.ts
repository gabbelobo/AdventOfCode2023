const text = await Deno.readTextFile("./day1/day1.input.txt");
// const split = text.split("\r\n");
const split = ["4fourztnthreeone8mqmdfour"];

type NumberString =
    | "one"
    | "two"
    | "three"
    | "four"
    | "five"
    | "six"
    | "seven"
    | "eight"
    | "nine";

const numberDict = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
};

const numbersStr = Object.keys(numberDict) as NumberString[];

const total = split.reduce((prev, curr) => {
    let first = {
        number: "",
        index: -1,
    };
    let second = {
        number: "",
        index: -1,
    };

    numbersStr.forEach((number) => {
        const index = curr.indexOf(number);
        if (index < 0) return;

        if (first.index < 0 || index < first.index) {
            first = {
                number: numberDict[number],
                index,
            };
        }

        if (second.index < 0 || index > second.index) {
            second = {
                number: numberDict[number],
                index,
            };
        }
    });
    for (let i = 0; i < curr.length; i++) {
        if (Number.isNaN(parseInt(curr[i]))) {
            continue;
        }
        if (!first.number || i < first.index) {
            first.index = i;
            first.number = curr[i];
        }

        break;
    }

    for (let j = curr.length - 1; j >= 0; j--) {
        if (Number.isNaN(parseInt(curr[j]))) {
            continue;
        }

        if (!second.number || j > second.index) {
            second.index = j;
            second.number = curr[j];
        }

        break;
    }

    let number = "";
    if (first.number) {
        number += first.number;
    }

    if (second.number) {
        number += second.number;
    }
    console.log(curr);
    console.log(number);

    return prev + parseInt(number);
}, 0);

console.log(total);
