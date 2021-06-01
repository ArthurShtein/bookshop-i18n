var gTrans = {
    titleh1: {
        en: 'Welcome To Arthurs Book Store',
        he: 'ברוכים הבאים לחנות הספרים של ארתור'
    },
    subtitle: {
        en: 'Best Books, Best Prices!',
        he: 'הספרים הטובים ביותר, במחירים הטובים ביותר!',
    },
    'btn-add-book': {
        en: 'Add New Book',
        he: 'הוסף ספר חדש'
    },
    'add-book-placeholder': {
        en: 'Add Book Book',
        he: 'שם הספר'
    },
    'add-price-placeholder': {
        en: 'Add Book Price',
        he: 'מחיר הספר'
    },
    'btn-read': {
        en: 'Read',
        he: 'קריאה'
    },
    'btn-update': {
        en: 'Update',
        he: 'עידכון'
    },
    'btn-delete': {
        en: 'Delete',
        he: 'מחיקה'
    },
    'btn-close': {
        en: 'Close',
        he: 'סגירה'
    },
    'btn-prev': {
        en: 'Prev',
        he: 'הקודם'
    },
    'btn-next': {
        en: 'Next',
        he: 'הבא'
    },
    id: { 
        en: 'ID',
        he: 'ברקוד' 
    },
    title: {
        en: 'Title',
        he: 'שם הספר' 
    },
    price: {
        en: 'Price',
        he: 'מחיר' 
    },
    actions: {
        en: 'Actions',
        he: 'פעולות' 
    }
    // date: {
    //     en: 'Date',
    //     he: 'תאריך'
    // }
}

var gCurrLang = 'en';

function getCurrLang(){
    return gCurrLang;
}
function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'
    var txt = keyTrans[gCurrLang];
    if (!txt) return keyTrans.en
    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var txt = getTrans(el.dataset.trans)
        if (el.nodeName === 'INPUT') el.placeholder = txt;
        else el.innerText = txt
    })
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    if (gCurrLang === 'he') {
        return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num); 
    } else {
        return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(num);
    }
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}