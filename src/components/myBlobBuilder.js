/**
 * Класс MyBlobBuilder.
 * Отвечает за создание массива, в который динамически будет
 * записываться информация для вывода в файл
 *
 * @class
 */
class MyBlobBuilder {
	/**
	 * Конструктор класса
	 *
	 * @constructor
	 */
	constructor() {
	    this.parts = [];
	}

	/**
	 * Добавление новой информации
	 *
	 * @param {Object} part - новый кусок информации
	 */
	append(part) {
		this.parts = [...this.parts, part];
		this.blob = undefined;
	}

	/**
	 * Получение нового куска данных
	 *
	 * @returns {Blob}
	 */
	getBlob() {
		return this.blob ? this.blob : new Blob(this.parts, {
			type: 'text/plain'
		})
	}
}

exports.MyBlobBuilder = MyBlobBuilder;
