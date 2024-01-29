import { AddBooks, loadDataFromStorage, searchBookByJudul, storageIsExist } from "./books.js";

document.addEventListener('DOMContentLoaded', () => {
    const inputBook = document.getElementById('inputBook');
    inputBook.addEventListener('submit', (event) => {
        event.preventDefault()
        AddBooks();
    })

    if (storageIsExist) {
        loadDataFromStorage();
    }

    const searchBook = document.getElementById('searchBook');
    searchBook.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchBookTitle = document.getElementById('searchBookTitle').value;

        searchBookByJudul(searchBookTitle);
    });
})