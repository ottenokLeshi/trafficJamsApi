# trafficJamsApi
 
## Идея проекта
Рассчет времени проезда между двумя точками.
 
Граф дорог города Санкт-Петербурга представлен 255-ю вершинами. 

Пользователь задает две вершины, приложение находит путь в графе между заданными вершинами и выдает суммарное время проезда.
 
## Конечная цель
Проект можно считать завершенным, если будет реализован следующий интерфейс:

1) Главная страница состоит из формы с двумя полями, куда необходимо вписать номера двух вершин. 

2) При отправке запроса на сервере запускается алгоритм Дейкстры, который находит путь между двумя точками и выдает пользователю время проезда между ними. 

3) Ребра и вершины графа хранятся в базе данных. Весом ребра является время проезда по нему. Веса для всех ребер рассчитываются с заданным интервалом. 
 
## Стек технологий
Node.js 

PostgreSQL + PostGIS

## Запуск приложения

1. `$ npm install`
2. `$ npm start`
3. Открываем браузер на 'localhost:8888'
4. Создаем файл config.js и прописываем конфигурации подключения к бд
