const MyBlobBuilder = require('./components/myBlobBuilder');
const workWithCoors = require('./helpers/index.js');
const pool = require('../database_side/database');

const lines = [];
let counter = 0;
const d = new Date();
const myBlobBuilder = new MyBlobBuilder();

/**
 * Функция, запускающая алгоритм получения параметров от API
 *
 * @param {Object} window - виртуальное окно
 */
const main = window => {
    myBlobBuilder.append(`TIME : ${d.getHours().toString()}:${d.getMinutes().toString()}\n`);
    pool.query('SELECT id, begin_p, end_p, ' +
        '(SELECT ST_AsText(point) FROM points WHERE id = begin_p) AS begin_point, ' +
        '(SELECT ST_AsText(point) FROM points WHERE id = end_p) AS end_point ' +
        'FROM lines', (err, data) => {
        if (err) {
            throw err;
        }
        counter = Object.keys(data.rows).length;
        for (let i = 0; i < counter; i += 1) {
            const line = [];

            Object.keys(data.rows[i]).forEach(obj => {
                if (obj !== 'begin_point' && obj !== 'end_point') {
                    line.push(data.rows[i][obj]);
                }
            });
            line.push(data.rows[i].beffgin_point.split(' ')[0].split('(')[1]);
            line.push(data.rows[i].begin_point.split(' ')[1].split(')')[0]);
            line.push(data.rows[i].end_point.split(' ')[0].split('(')[1]);
            line.push(data.rows[i].end_point.split(' ')[1].split(')')[0]);
            lines.push(line.join(' '));
        }
        workWithCoors(lines, myBlobBuilder, window);
    });
};

module.exports = main;
