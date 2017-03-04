/**
 * Функция проверяет, есть ли обработчики запроса, вызывая их впоследствии, или же возвращает 404
 *
 * @param {Array} handle - массив функций-обработчиков запроса
 * @param {String} pathname - запрошенный путь URL
 * @param {Array} response - ответ на запрос
 *
 * @return {Function} - вызов обработчика запроса
 */
const route = (handle, pathname, response) => {
    /* eslint-disable no-console */
    console.log(`About to route a request for ${pathname}`);
    if (typeof handle[pathname] === 'function') {
        return handle[pathname](response, pathname);
    }
    return handle['/getError'](response, pathname);
};

module.exports = route;
