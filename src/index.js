/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    let i, 
        length = array.length;

    for ( i = 0; i < length; i++ ) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, callback) {
    let i, 
        length = array.length, 
        result = [];

    for ( i = 0; i < length; i++ ) {
        result.push( callback( array[i], i, array ));
    }

    return result;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */

function reduce(array, fn, initial = array[0]) {
    let res = initial, 
        index = 1;

    if (res != array[0]) {
        index = 0;
    }

    let i, 
        length = array.length;

    for (i = index; i < length; i++) {
        res = (fn(res, array[i], i, array));
    }

    return res;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */

function upperProps(obj) {
    var upperArray = [];

    for (var props in obj) {
        if (obj.hasOwnProperty(props)) {
            upperArray.push(props.toUpperCase());
        }
    }

    return upperArray;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */

function slice(array, from = 0, to = array.length) {
    var array2 = [];

    if (from < 0 && Math.abs(from) > array.length) {
        from = 0;
    } 
    if (from < 0) {
        from = array.length + from;
    } 
    if (from > array.length) {
        from = array.length; 
    }

    if (to < 0 && Math.abs(to) < array.length) {
        to = array.length + to;
    } 
    if (to > array.length) {
        to = array.length;
    } 

    for (var i = from; i < to; i++) {
        array2.push(array[i]);
    }

    return array2;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

    return new Proxy(obj, {
        get(target, propKey) {
      
            return target[propKey] ** 2
        }
    })
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
