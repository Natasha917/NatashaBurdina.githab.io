// global variables
let colors = ['#979797', '#7395ae']; // массив цветов выкл/вкл
let run; // запущено или остановлено приложение
let _quest = document.querySelector('#quest'); // элемент вопроса
let _title = document.querySelector('#title'); // элемент заголовка
let _help = document.querySelector('#help'); // элемент подсказки

// functions
const init = function () { // инициализация
    run = true; // запускаем приложение
    _title.innerHTML = es.title;
    _help.innerHTML = 'кликни на картинку для сброса';
    print_dialog(es.start); // печатаем первый вопрос и ответы
};

const print_dialog = function (post) { // варианты ответов
    document
        .querySelectorAll('.line') // все по имени класса
        .forEach(line => line.hidden = true); // делаем скрытыми

    let answers = es.dict[post]; // узнаем текущие ответы

    if (typeof answers === 'undefined') { // если уже достигнут листок дерева
        run = false; // остановить работу ЭС
        _quest.innerHTML = `Выбор сделан -> ${post.toUpperCase()}`; // публикуем выбор
        document.getElementById('img').src = "img/" + post + ".png";
    }
    else {
        if (answers.length === 0) { // если нет ответов на вопрос
            run = false; // остановить работу ЭС
            _quest.innerHTML = `Для категории "${post}" нет выбора.`;
        }
        else {  // публикуем вопрос и варианты ответов
            _quest.innerHTML = `${post}`;    
            answers
                .forEach((answer, index) => {
                    document.querySelector('#answer' + String(index)).innerHTML = answer;
                    document.querySelector('.line' + String(index)).hidden = false;
                });
        }
    }
}

// event handlers
document // при загрузке страницы
    .addEventListener("DOMContentLoaded", init);

document // при клике по ячейке таблицы
    .querySelectorAll('#dialog .answer') // найти массив ячеек таблицы с ответами
    .forEach(td_answer => { // для каждой ячейки назначить обработчики событий
        td_answer.addEventListener("click", () => print_dialog(td_answer.innerHTML));
        td_answer.addEventListener('mouseenter', () => td_answer.style.backgroundColor = colors[1]);
        td_answer.addEventListener('mouseleave', () => td_answer.style.backgroundColor = colors[0]);
    });