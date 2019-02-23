/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дoбавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задaвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    var newDiv = document.createElement('div');
    var divsize = ((Math.random() * 100) + 50).toFixed();
    var color = '#' + Math.round(0xffffff * Math.random()).toString(16);
    var posx = (Math.random() * (document.body.clientWidth - divsize)).toFixed();
    var posy = (Math.random() * (document.body.clientHeight - divsize)).toFixed();

    newDiv.style.width = divsize + 'px';
    newDiv.style.height = divsize + 'px';
    newDiv.style.backgroundColor = color;
    newDiv.style.top = posx + 'px';
    newDiv.style.left = posy + 'px';
    newDiv.className = 'draggable-div';
    newDiv.setProperty = ('draggable', true);

    return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener('dragstart', handleDragStart, false );
    target.addEventListener('drop', handleDrop, false);
    target.addEventListener('dragend', handleDragEnd, false );

    function handleDragStart(e) {
        e.target.style.opacity = '0.4';

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.dropEffect = 'move';
    }
    
    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation()
        }

        return false;
    }

    function handleDragEnd(e) {
        e.target.style.opacity = '1';
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
