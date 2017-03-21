const fs = require('fs');
const lines = require('../database_side/models/lines');
const methodsDb = require('../database_side/databaseMethods');

/**
 * Функция, запускающаяся после полного обновления значений в БД
 * Считывает обновленные значение из БД и записывает их в файл,
 * который отдается пользователю
 */
const updateFile = () => {
    methodsDb.readDb(lines, {
        order: 'id'
    }).then(data => {
        const nodes = data.map(item => {
            const node = item.toJSON();
            return `id: ${node.id} weight: ${node.weight} updatedAt: ${node.updatedAt}`;
        }).join('\n');
        fs.writeFile('public/output.txt',nodes, (err) =>{
            if (err) {
                console.log(err);
            }
            console.log('File "output.txt" was updated');
        });
    });
};

module.exports = updateFile;