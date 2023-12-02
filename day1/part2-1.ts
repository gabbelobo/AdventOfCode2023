const text = await Deno.readTextFile("./day1/day1.input.txt");
const split = text.split("\r\n");

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
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

const numbersStr = Object.keys(numberDict) as NumberString[];

const total = split.reduce((prev, curr) => {
    const first = {
        number: 0,
        index: curr.length + 1,
    };
    const second = {
        number: 0,
        index: -1,
    };
    let i = 0;
    while (i <= curr.length) {
        const parsed = parseInt(curr[i]);
        if (!Number.isNaN(parsed)) {
            if (i < first.index) {
                first.index = i;
                first.number = parsed;
            }

            if (i > second.index) {
                second.index = i;
                second.number = parsed;
            }
            i++;
            continue;
        }

        numbersStr.every((number) => {
            const substring = curr.slice(i);
            if (substring.indexOf(number) !== 0) return true;

            if (i < first.index) {
                first.index = i;
                first.number = numberDict[number];
            }

            if (i > second.index) {
                second.index = i;
                second.number = numberDict[number];
            }

            return false;
        });

        i++;
    }

    let number = "";
    if (first.number > 0) {
        number += first.number.toString();
    }

    if (second.number > 0 && second.index !== first.index) {
        number += second.number.toString();
    }

    return prev + parseInt(number);
}, 0);

console.log(total);
