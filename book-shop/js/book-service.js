const KEY = 'books';
var gBooks;
var gSortBy = 'Title'
var gSortByDiff = -1;
const PAGE_SIZE = 5;
var gCurrPage = 0;


function _creatBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = [
            _creatBook('Lord Of The Rings', 49, 'lord'),
            _creatBook('Harry Potter', 59, 'harry'),
            _creatBook('Game Of Thrones', 35, 'thrones'),
            _creatBook('The Hobbit', 44, 'hobbit'),
        ]
    }
    gBooks = books;
    _saveBooksToStorage()
}

function turnPage(diff) {
    if (((gCurrPage + diff) * PAGE_SIZE >= gBooks.length) || (gCurrPage + diff < 0)) return;
        gCurrPage += diff
}

function _creatBook(name, price, img = 'Default', rate = 0) {
    var book = {
        id: makeId(),
        name,
        price,
        img: img,
        rate
    }
    return book;
}

function getPage(){
    return gCurrPage + 1
}

function sortBooks() {
    gSortByDiff *= -1
    if (gSortBy === 'title') {
        gBooks.sort(function (bookA, bookB) {
            if (bookA.name.toLowerCase() < bookB.name.toLowerCase())
                return -1 * gSortByDiff;
            else if (bookA.name.toLowerCase() > bookB.name.toLowerCase())
                return 1 * gSortByDiff
        })
    } else if (gSortBy === 'price') {
        gBooks.sort(function (bookA, bookB) {
            return (bookB.price - bookA.price) * gSortByDiff;
        })
    }
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function getBooks() {
    var fromIdx = gCurrPage * PAGE_SIZE
    var toIdx = fromIdx + PAGE_SIZE
    sortBooks()
    return gBooks.slice(fromIdx, toIdx)
    // return gBooks;
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

function upRating(bookId) {
    var book = getBookById(bookId)
    if (book.rate >= 10) {
        return;
    } else {
        book.rate++;
    }
    _saveBooksToStorage()
}

function downRating(bookId) {
    var book = getBookById(bookId)
    if (book.rate <= 0) {
        return
    } else {
        book.rate--;
    }
    _saveBooksToStorage()
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    if (bookIdx === -1) return;
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function addBook(name, price) {
    var book = _creatBook(name, price)
    gBooks.push(book);
    _saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks[bookIdx].price = newPrice
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}