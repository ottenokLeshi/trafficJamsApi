/**
 * Создание виртуального окна
 *
 */
let dir = __dirname.split('/');
dir.splice(dir.length-1, 1);
dir = dir.join('/');
console.log(dir);

let jsdom = require("jsdom").jsdom;
let main = require( dir + "/src/app.js");



const createWindow = () => {
    let html = "<!DOCTYPE html><html><head><script src=\"http://api-maps.yandex.ru/2.0/?load=package.standard,package.geoObjects,package.route&lang=ru-RU\" type=\"text/javascript\"></script></head><body></body></html>";
    let window = jsdom(html, {
            features: {
                FetchExternalResources: ["script"],
                ProcessExternalResources: ["script"]
            }
        }
    ).defaultView;

    window.onload = () => {
        window.ymaps.ready(() => {
            main.main(window);
        });
    };
};

exports.createWindow = createWindow;