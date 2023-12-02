const text = await Deno.readTextFile("./day2/input.txt");
const split = text.split("\r\n");

const limits = {
    red: 12,
    green: 13,
    blue: 14,
};

const result = split.reduce((prev, curr) => {
    const gameIdMatch = curr.match(/Game (?<id>\d+)/);
    const gameId = parseInt(gameIdMatch?.groups?.id!);

    const sets = curr.match(/( \d+ \w+[,]?)+/gm);

    const validGame = sets?.every((set) => {
        const balls = set.replace(/\s/g, "").split(",");

        return balls.every((ball) => {
            const matchBall = ball.match(/(?<number>\d+)(?<color>\w+)/);
            const number = parseInt(matchBall?.groups?.number!);
            const color = matchBall?.groups?.color as keyof typeof limits;
            return limits[color] >= number;
        });
    });
    if (validGame) prev += gameId;
    return prev;
}, 0);

console.log(result);
