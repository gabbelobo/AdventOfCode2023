const text = await Deno.readTextFile("./day1.input.txt");
const split = text.split("\r\n");

const total = split.reduce((prev, curr) => {
    let first = "";
    let second = "";
    for (let i = 0; i < curr.length; i++) {
        if (Number.isNaN(parseInt(curr[i]))) {
            continue;
        }

        first = curr[i];
        break;
    }

    for (let j = curr.length - 1; j >= 0; j--) {
        if (Number.isNaN(parseInt(curr[j]))) {
            continue;
        }

        second = curr[j];
        break;
    }

    const numberStr = `${first}${second}`;
    return prev + parseInt(numberStr);
}, 0);

console.log(total);
