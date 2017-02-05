/**
 * Загрузка данных для первого запуска БД
 */
const fs = require('fs');
const pool = require('./database');

/**
 * Функция добавляющая вершины
 */
const loadPointsToDb = () => {
    fs.readFile('./input.txt', (err, data) => {
        if (err) {
            throw err;
        }
        const lines = data.toString().split('\n');
        let k = 1;
        lines.forEach(info => {
            const line = info.split(' ');
            if (parseInt(line[1], 10) === k) {
                const m = `POINT(${parseFloat(line[3])} ${parseFloat(line[4])})`;
                pool.query('INSERT INTO points VALUES ($1, $2)', [parseInt(line[1], 10), m]);
                k += 1;
            }
        });
    });
};

/**
 * Функция добавляющая ребра
 */
const loadEdgesToDb = () => {
    fs.readFile('./input.txt', (err, data) => {
        if (err) {
            throw err;
        }
        const lines = data.toString().split('\n');
        lines.forEach(info => {
            const line = info.split(' ');
            pool.query('INSERT INTO lines VALUES ($1, $2, $3)',
                [parseInt(line[0], 10), parseInt(line[1], 10), parseInt(line[2], 10)]
            );
        });
    });
};

module.exports = loadPointsToDb;
module.exports = loadEdgesToDb;
