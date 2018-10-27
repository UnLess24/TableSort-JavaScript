// Получение элемента таблицы
const table = document.querySelector('table');
// Переменная, отсортированна ли таблица по колонке
let colIndex = -1;

// Функция сортировки
const sortTable = function (index, type, isSorted) {
    // Получение элемента tbody таблицы
    const tbody = table.querySelector('tbody');

    // Функция сравнения значения элементов
    const compare = function (rowA, rowB) {
        // Получение данных из ячеек сравниваемых строк
        const rowDataA = rowA.cells[index].innerHTML;
        const rowDataB = rowB.cells[index].innerHTML;

        // Возрат из фунции сравнения в зависимости от типа данных в колонке
        switch (type) {
            case 'integer':
            case 'double':
                return rowDataA - rowDataB;
                break;
            case 'date':
                const dateA = rowDataA.split('.').reverse().join('-');
                const dateB = rowDataB.split('.').reverse().join('-');
                return new Date(dateA).getTime() - new Date(dateB).getTime();
                break;
            case 'text':
                if (rowDataA < rowDataB) return -1;
                else if (rowDataA > rowDataB) return 1;
                return 0;
                break;
        }
    }

    // Создание массива строк
    let rows = [].slice.call(tbody.rows);

    // Сортировка строк
    rows.sort(compare);

    // Если таблица отсортирована по этой колонке
    if (isSorted) rows.reverse();

    // Удаление элемента (выполняется для производительности)
    table.removeChild(tbody);

    // Заполнение элемента tbody строками
    for (let i = 0; i < rows.length; i++) {
        tbody.appendChild(rows[i]);
    }

    // Добавление заполненного элемента к таблице
    table.appendChild(tbody);
}

// Событие при клике по таблице
table.addEventListener('click', (e) => {
   const el = e.target;
   // Если клик выполнен не на элементе th
   if (el.nodeName !== 'TH') return;

   // Получение данных из из элемента th
   const index = el.cellIndex;
   const type = el.getAttribute('data-type');

   // Запуск сортировки
   sortTable(index, type, colIndex === index);
   // Присвоение значения переменой
   colIndex = (colIndex === index) ? -1 : index;
});
