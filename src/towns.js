/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер.

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново.
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий.
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер.

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения.

 Массив городов можно получить, отправив асинхронный запрос по адресу:
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    hiddenBlocks();
    loadingBlock.style.display = 'block';

    var url = ('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');

    return fetch(url)
        .then(response => {
            if (response.status >= 400) {
                return Promise.reject('Не удалось загрузить города');
            }
            
            return response.json();
        })
        .then(cities => cities.sort((a, b) => a.name.localeCompare(b.name)));
}

function hiddenBlocks() {
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'none';
    infoBlock.style.display = 'none';
}

// let buttonRepeate = document.createElement('button');

// buttonRepeate.innerHTML = 'Повторить';
// infoBlock.appendChild(buttonRepeate);
// buttonRepeate.style.background = '#333';
// buttonRepeate.style.color = '#fff';
// buttonRepeate.style.fontSize = '16px';
// buttonRepeate.style.display = 'block';
// buttonRepeate.style.padding = '8px 24px';
// buttonRepeate.style.marginTop = '30px';

/*
 Функция должна проверять встречается ли подстрока chunk в строке full.
 Проверка должна происходить без учета регистра символов.

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    let searchResponse = (full.toLowerCase().indexOf(chunk.toLowerCase()) != -1) ? true : false;
    
    return searchResponse;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */ 
const filterResult = homeworkContainer.querySelector('#filter-result');
/* Блок с информацией о загрузке */
const infoBlock = homeworkContainer.querySelector('#info-block');
const buttonRepeate = homeworkContainer.querySelector('button');

buttonRepeate.addEventListener('click', () => loadTowns());

let townsData;

loadTowns()
    .then((data) => {
        townsData = data;
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';
    })
    .catch((err) => {
        homeworkContainer.innerHTML = `Не удалось загрузить города.`;
        hiddenBlocks();
        infoBlock.style.display = 'block';
    });

filterInput.addEventListener('keyup', function() {
    let inputVal = filterInput.value;

    filterResult.innerHTML = '';

    for (let i = 0; i < townsData.length; i++) {
        let town = townsData[i].name;

        if (town !== '' && inputVal !== '' && isMatching(town, inputVal)) {
            let townElement = document.createElement('p');

            townElement.innerHTML = town;
            filterResult.appendChild(townElement);
        }
    }
});

export {
    loadTowns,
    isMatching
};