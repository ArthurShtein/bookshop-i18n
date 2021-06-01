
function init() {
    _creatBooks();
    render();
}

function render() {
    renderBooks();
    doTrans()
}

function renderBooks() {
    var books = getBooks()
    console.log(books)
    var strHtmls = books.map(function (book) {
        return ` <tr>
            <td> ${book.id} </td>
            <td> ${book.name} </td>
            <td> ${formatCurrency(book.price)} </td>
            <td>
                 <button data-trans="btn-read" class="read" onclick="onReadBook('${book.id}')"> Read </button>
                 <button data-trans="btn-update" class="update" onclick="onUpdateBook('${book.id}')"> Update </button>
                 <button data-trans="btn-delete" class="delete" onclick="onDeleteBook('${book.id}')"> Delete </button>
            </td>
        </tr>`;
    });
    document.querySelector('.body-table').innerHTML =  strHtmls.join('');
    doTrans()
}

function renderPageNum() {
    document.querySelector('.pagination span').innerText = getPage();
}

function onTurnPage(diff) {
    turnPage(diff);
    renderPageNum();
    render();
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
    doTrans()
    // render();
}

function onSortBy(sortBy) {
    setSort(sortBy);
    render();
}

function onAddBook(ev) {
    ev.preventDefault();
    elBookName = document.querySelector('input[name=bookname]')
    elPrice = document.querySelector('input[name=price]')
    if (!elBookName.value || !elPrice.value) return;

    addBook(elBookName.value, elPrice.value)
    render();
}

function onUpdateBook(bookId) {
    // var str = (getCurrLang() === 'en') ? 'Update Price:':'עדכן מחיר:';
    if (getCurrLang() === 'en') {
        var newPrice = +prompt('Update Price:')
        // if (!newPrice) return;
    } else {
        var newPrice = +prompt('עדכן מחיר:')
        // if (!newPrice) return;
    }
    if (!newPrice) return;
    updateBook(bookId, newPrice)
    render()
    console.log('gSortBy ', gSortBy);
    console.log('gSortByDiff ', gSortByDiff);

}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elImg = document.querySelector('.image-container')
    var elModal = document.querySelector('.modal')
    var elRating = document.querySelector('.rating')

    elModal.querySelector('h3').innerText = book.name
    elImg.innerHTML = `<img src="img/${book.img}.jpg">`
    elModal.querySelector('h4').innerText = book.price + '$'
    elModal.querySelector('p').innerText = makeLorem()
    elRating.innerHTML = `<button class="vote-button" onclick="onDownRating('${book.id}')"> - </button> ${book.rate} <button class="vote-button" onclick="onUpRating('${book.id}')"> + </button>`
    elModal.hidden = false
}

function onUpRating(bookId) {
    upRating(bookId)
    onReadBook(bookId)
}

function onDownRating(bookId) {
    downRating(bookId)
    onReadBook(bookId)
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}


function onSetLang(lang) {
    setLang(lang);
    // TODO: if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    render()
}