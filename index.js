//Possible inputs
// 13 8 8 8 9 8 10 14 1 14 2 14 3 53 14 54 14 55 14 27 11 27 12 28 11 28 12
// 5 5 5 6 5 7 5 7 4 6 3
// 36 1 5 1 6 2 5 2 6 11 5 11 6 11 7 12 4 12 8 13 3 13 9 14 3 14 9 15 6 16 4 16 8 17 5 17 6 17 7 18 6 21 3 21 4 21 5 22 3 22 4 22 5 23 2 23 6 25 1 25 2 25 6 25 7 35 3 35 4 36 3 36 4

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const empty = '□';
const lifecell = '■';

const w = 100;
const h = 40;

rl.question('Enter start configuration: ', (data) => {
    const field = createField(w, h);
    
    prepareField(field, data);
    draw(field);
    setInterval(() => {
        makeLifecycle(field);
        console.clear();
        draw(field);
    }, 100);
    rl.close();
})

function makeLifecycle(field) {
    let snapshot = field.map(arr => arr.slice());
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const nbrs = getCount(j, i, snapshot);
            if (field[i][j] == lifecell && (nbrs == 2 || nbrs == 3)) {
                continue;
            }
            if (nbrs <= 1) {
                field[i][j] = empty;
            }
            if (nbrs >= 4) {
                field[i][j] = empty;
            }
            if (nbrs == 3) {
                field[i][j] = lifecell;
            }
        }
    }
}

function getCount(x, y, arr) {
    const dirs = [[0, 1], [0, -1], [-1, 0], [-1, 1], [-1, -1], [1, 0], [1, 1], [1, -1]];
    let sum = 0;
    dirs.forEach(pair => {
        sum += isAlive(x + pair[0], y + pair[1], arr);
    })

    return sum;
}

function isAlive(x, y, arr) {
    if (x < 0 || y < 0 || x >= w || y >= h) {
        return 0;
    }

    return (arr[y][x] == lifecell ? 1 : 0);
}

function prepareField(field, data) {
    numbs = data.split(' ');
    let n = +numbs[0];
    let ind = 1;
    for (let i = 0; i < n; i++) {
        let x = +numbs[ind++];
        let y = +numbs[ind++];
        field[y][x] = lifecell;
    }
}

function createField(width, height) {
    let arr = new Array(height);
    for (let i = 0; i < height; i++) {
        arr[i] = new Array(width);
        for (let j = 0; j < width; j++) {
            arr[i][j] = empty;
        }
    }

    return arr;
}

function draw(field) {
    field.forEach(row => {
        console.log(row.join(''));
    });
}