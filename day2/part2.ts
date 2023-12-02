const text = await Deno.readTextFile("./day2/input.txt");
const split = text.split("\r\n");

const limits = {
    red: 12,
    green: 13,
    blue: 14,
};

const result = split.reduce((prev, curr) => {
    const sets = curr.match(/( \d+ \w+[,]?)+/gm);
    const minimum = {
        red: 0,
        green: 0,
        blue: 0,
    };

    sets?.forEach((set) => {
        const balls = set.replace(/\s/g, "").split(",");

        balls.forEach((ball) => {
            const matchBall = ball.match(/(?<number>\d+)(?<color>\w+)/);
            const number = parseInt(matchBall?.groups?.number!);
            const color = matchBall?.groups?.color as keyof typeof limits;

            if (minimum[color] < number) {
                minimum[color] = number;
            }
        });
    });
    const power = minimum.blue * minimum.green * minimum.red;
    return (prev += power);
}, 0);

console.log(result);
