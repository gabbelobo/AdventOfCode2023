const text = await Deno.readTextFile("./day1/day1.input.txt");
const split = text.split("\r\n");
// const split = ["twoklhndseven6jdhcsccjgp68twonelb"];
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

const numberDict: Record<NumberString, number> = {
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

const numberRegex = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;

function parseMatch(match: string | undefined) {
    if (!match) return 0;
    const parsedInt = parseInt(match);
    if (!Number.isNaN(parsedInt)) {
        return parsedInt;
    }

    return numberDict[match as NumberString];
}

const total = split.reduce((prev, curr) => {
    const matches = Array.from(curr.matchAll(numberRegex));
    if (!matches || matches.length === 0) {
        return prev;
    }
    const number =
        matches.length > 0
            ? parseInt(
                  `${parseMatch(matches.at(0)![1])}${parseMatch(
                      matches.at(-1)![1]
                  )}`
              )
            : parseMatch(matches[0][1]);
    return prev + number;
}, 0);

console.log(total);
