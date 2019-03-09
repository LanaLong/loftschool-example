/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации.

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя;
   - значение;
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы).

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя;
   - значение;
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением).

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено.

 7.3: На странице должно быть текстовое поле для фильтрации cookie.
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение.
 Если в поле фильтра пусто, то должны выводиться все доступные cookie.
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу.
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, и из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер.
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий.
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер.

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function getCookies() {
  return document.cookie
    .split('; ')
    .filter(Boolean)
    .map(cookie => cookie.match(/^([^=]+)=(.+)/))
    .reduce((obj, [, name, value]) => {
      obj[name] = value;

      return obj;
    }, {});
}

// matching function
function isMatch(full, chunk) {
  if (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) {
    return true;
  } else {
    return false;
  }
}

renderTable();

//delete cookie
listTable.addEventListener('click', function (e) {
  // console.log(e.target);
  if (e.target.dataset.key) {
    document.cookie = e.target.dataset.key + `=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
  renderTable();
});

// handle search key
filterNameInput.addEventListener('keyup', function () {
  renderTable();
});

// add cookie
addButton.addEventListener('click', () => {
  document.cookie = `${addNameInput.value} = ${addValueInput.value}`;
  renderTable();

  addNameInput.value = '';
  addValueInput.value = '';
});

// render
function renderTable() {
  const cookie_obj = getCookies();
  listTable.innerHTML = '';
  for (let key in cookie_obj) {
    if (!(isMatch(key, filterNameInput.value) || isMatch(cookie_obj[key], filterNameInput.value))) continue;
    listTable.innerHTML += `<tr><td class="first_td">${key}</td><td>${cookie_obj[key]}</td><td><button class="del" 
        data-key="${key}">Удалить</button></td></tr>`;
  }
}