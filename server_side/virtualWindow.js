/**
 * Создание виртуального окна
 *
 * https://github.com/tmpvar/jsdom
 */
const jsdom = require('jsdom').jsdom;
const main = require('../src/app');

const createWindow = () => {
    const html = '<!DOCTYPE html><html><head>' +
        '<script src="http://api-maps.yandex.ru/2.0/?load=package' +
        '.standard,package.geoObjects,package.route&lang=ru-RU" ' +
        'type="text/javascript"></script></head>' +
        '<body></body></html>';
    const window = jsdom(html, {
        features: {
            FetchExternalResources: ['script'],
            ProcessExternalResources: ['script']
        }
    }).defaultView;

    window.onload = () => {
        window.ymaps.ready(() => {
            main(window);
        });
    };
};

exports.createWindow = createWindow;
