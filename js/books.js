// global variable
const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
const completeBookshelfList = document.getElementById('completeBookshelfList');

const bookData = [];
const BOOKS_ITEM = 'book_item';

// schema books
const schemaBooks = (id, judul, penulis, tahun, isComplete) => {
    return {
        id,
        judul,
        penulis,
        tahun,
        isComplete,
    }
}

const generateId = () => { return +new Date };

function storageIsExist() {
    if (typeof (Storage) === undefined) {
        alert('maaf broser kamu tidak mendukung')
        return false;
    }

    return true;
}

const saveDataBooks = () => {
    if (storageIsExist()) {
        const parsed = JSON.stringify(bookData);
        localStorage.setItem(BOOKS_ITEM, parsed);
    }
}

const loadDataFromStorage = () => {
    const serializeData = localStorage.getItem(BOOKS_ITEM);
    const datas = JSON.parse(serializeData);

    if (datas !== null) {
        for (const data of datas) {
            bookData.push(data);
        }
    }
    renderEvent();
}

const findBookByJudul = (judulBook) => {
    for (const book of bookData) {
        if (book.judul === judulBook) {
            return book;
        }
    }
    return null;
}

const searchBookByJudul = (judulBook) => {
    if (!judulBook) {
        alert('Masukkan Judul');
        return;
    }
    const bookTarget = findBookByJudul(judulBook);
    if (!bookTarget) return alert('masukkan judul yang sesuai');

    templateSearchBooks(bookTarget);
}

const templateSearchBooks = (bookTarget) => {
    const { id, judul, penulis, tahun, isComplete } = bookTarget;
    const containerSearchBooks = document.createElement('article');
    containerSearchBooks.setAttribute('id', id);
    containerSearchBooks.classList.add('book_item');

    const judulBook = document.createElement('h3');
    judulBook.innerText = judul;

    const penulisBook = document.createElement('p');
    penulisBook.innerText = `Penulis: ${penulis}`;

    const tahunBook = document.createElement('p');
    tahunBook.innerText = `Tahun: ${tahun}`;

    const status = document.createElement('p');
    if (isComplete) {
        status.innerText = `Status: Selesai Dibaca`;
    } else {
        status.innerText = `Status: Belum Dibaca`;
    }

    containerSearchBooks.append(judulBook, penulisBook, tahunBook, status);

    const searchItem = document.getElementById('searchItem');

    searchItem.append(containerSearchBooks);

    const searchBookTitle = document.getElementById('searchBookTitle');

    searchBookTitle.value = '';
}

const findBookById = (bookId) => {
    for (const index in bookData) {
        if (bookData[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

const removeBook = (bookId) => {
    const bookTarget = findBookById(bookId);
    if (bookTarget === -1) return;

    bookData.splice(bookTarget, 1);
    saveDataBooks();

    renderEvent();
}

const findBook = (bookId) => {
    for (const book of bookData) {
        if (book.id === bookId) {
            return book
        }
    }
    return null;
}

const unReadingBook = (bookId) => {
    const bookTarget = findBook(bookId);
    if (bookTarget === null) return;

    bookTarget.isComplete = false;

    saveDataBooks();
    renderEvent();
};

const readBook = (bookId) => {
    const bookTarget = findBook(bookId);
    if (bookTarget === null) return;

    bookTarget.isComplete = true;
    saveDataBooks();
    renderEvent();
}

const renderEvent = () => {
    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';

    for (const book of bookData) {
        const template = templateBooks(book);
        if (!book.isComplete) {
            incompleteBookshelfList.append(template);
        } else {
            completeBookshelfList.append(template);
        }
    }

}

const templateBooks = (books) => {

    const { id, judul, penulis, tahun, isComplete } = books
    const containerBooks = document.createElement('article');
    containerBooks.setAttribute('id', id);
    containerBooks.classList.add('book_item');

    const judulBooks = document.createElement('h3');
    judulBooks.innerText = judul

    const penulisBooks = document.createElement('p');
    penulisBooks.innerText = `Penulis: ${penulis}`;

    const tahunBooks = document.createElement('p');
    tahunBooks.innerText = `Tahun: ${tahun}`;

    const containerBtn = document.createElement('div');
    containerBtn.classList.add('action');

    containerBooks.append(judulBooks, penulisBooks, tahunBooks, containerBtn);

    const btnGreen = document.createElement('button');
    btnGreen.classList.add('green');
    const btnRed = document.createElement('button');
    btnRed.classList.add('red');

    containerBtn.append(btnGreen, btnRed);

    if (isComplete) {
        // complete book list
        completeBookshelfList.append(containerBooks);

        btnGreen.innerText = 'Belum Selesai Baca';
        btnRed.innerText = 'Hapus Buku';

        btnRed.addEventListener('click', () => {
            removeBook(id);
        })

        btnGreen.addEventListener('click', () => {
            unReadingBook(id);
        });

    } else {
        // incomplete book list
        incompleteBookshelfList.append(containerBooks);

        btnGreen.innerText = 'Selesai Baca';
        btnRed.innerText = 'Hapus Buku';

        btnRed.addEventListener('click', () => {
            removeBook(id);
        });

        btnGreen.addEventListener('click', () => {
            readBook(id);
        });
    }

    return containerBooks;
}

const AddBooks = () => {
    const inputBookTitle = document.getElementById('inputBookTitle').value = '';
    const inputBookAuthor = document.getElementById('inputBookAuthor').value = '';
    const inputBookYear = document.getElementById('inputBookYear').value = '';
    const inputBookIsComplete = document.getElementById('inputBookIsComplete').checked;

    const idBooks = generateId();
    const dataBooks = schemaBooks(idBooks, inputBookTitle, inputBookAuthor, parseInt(inputBookYear), inputBookIsComplete);

    bookData.push(dataBooks);

    saveDataBooks();

    renderEvent();
}

export { AddBooks, loadDataFromStorage, storageIsExist, searchBookByJudul };