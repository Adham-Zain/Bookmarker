var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkUrlInput = document.getElementById("bookmarkUrl");
var Myalert = document.getElementById("alert");
var warning = document.getElementById("warning");

var bookMarks = [];


if (localStorage.getItem("bookMarks") !== null) {

    bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
    displaybookMarks();
}
function addBookMark() {

    if (validationInput(bookmarkNameInput) & validationInput(bookmarkUrlInput)) {
        var bookmark = {
            bookmarkName: bookmarkNameInput.value,
            bookmarkUrl: bookmarkUrlInput.value,
        }
        bookMarks.push(bookmark);
        clearInputs();
        savebookMarks();
        displaybookMarks();
    }
    else {
        showAlert()
    }
}
function clearInputs() {
    bookmarkNameInput.value = null;
    bookmarkUrlInput.value = null;
}
function displaybookMarks() {
    var content = ``;

    for (var i = 0; i < bookMarks.length; i++) {
        content += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${bookMarks[i].bookmarkName}</td>
            <td><a href="https://${bookMarks[i].bookmarkUrl}" target="_blank" class="btn btn-success"><i class="fa-regular fa-eye"></i> Visit</a>
            </td>
            <td><button onclick="deleteBookMark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button>
            </td>
        </tr>
        `
    }
    document.getElementById("bookMarks").innerHTML = content;

}
function deleteBookMark(deletedIndex) {
    bookMarks.splice(deletedIndex, 1);
    displaybookMarks();
    savebookMarks();
}
function savebookMarks() {
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
}
function validationInput(element) {
    var regex = {
        bookmarkName: /^[A-Z][a-z]{2,15}$/,
        bookmarkUrl: /^w{3}\.[a-z]{3,15}\.com$/,
    }

    if (regex[element.id].test(element.value) == true) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid")
        element.nextElementSibling.classList.add("d-none");
        return true;
    }
    else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid")
        element.nextElementSibling.classList.remove("d-none");
        return false;
    }
}
function hideAlert() {
    Myalert.classList.replace("d-block", "d-none");
}
function showAlert() {
    Myalert.classList.replace("d-none", "d-block");
}
function showWarning() {

    if (bookMarks.length == 0) {
        window.alert("No Bookmarks to delete")
    }
    else {
        warning.classList.replace("d-none", "d-block");
    }

}
function hideWarning() {
    warning.classList.replace("d-block", "d-none");
}
function clearData() {
    bookMarks = [];
    savebookMarks();
    hideWarning();
    displaybookMarks();
}