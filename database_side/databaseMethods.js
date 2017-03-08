/**
 * CRUD операции
 */
/* eslint-disable no-console */

/**
 * Функция Create
 * @param {Models} table - Sequelize-объект, таблица из /models/
 * @param {Object} elements - добавляемые элементы
 * @return {Promise}
 */
const createDb = (table, elements) => {
    if (Array.isArray(elements)) {
        return table
            .bulkCreate(elements)
            .catch(err => console.log(`Database error: ${err}`));
    }
    return table
        .create(elements)
        .catch(err => console.log(`Database error: ${err}`));
};

/**
 * Функций Read
 * @param {Models} table - Sequelize-объект, таблица из /models/
 * @param {Object} parametrs - параметры
 * @return {Promise}
 */
const readDb = (table, parametrs) => {
    return table
        .findAll(parametrs)
        .catch(err => console.log(`Database error: ${err}`));
};

/**
 * Функция Update
 * @param {Models} table - Sequelize-объект, таблица из /models/
 * @param {Object} element - обновляемые значения
 * @param {Object} parametrs - параметры
 * @return {Promise}
 */
const updateDb = (table, element, parametrs) => {
    return table
        .update(element, parametrs)
        .catch(err => console.log(`Database error: ${err}`));
};

/**
 * Функция Delete
 * @param {Models} table - Sequelize-объект, таблица из /models/
 * @param {Object} parametrs - параметры
 * @return {Promise}
 */
const deleteDb = (table, parametrs) => {
    return table
        .destroy(parametrs)
        .catch(err => console.log(`Database error: ${err}`));
};


module.exports = {
    createDb: createDb,
    readDb: readDb,
    updateDb: updateDb,
    deleteDb: deleteDb
};
