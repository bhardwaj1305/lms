```javascript
let books = JSON.parse(localStorage.getItem("books")) || [
    { id: 1, title: "Java Programming", author: "James Gosling", issued: false },
    { id: 2, title: "Clean Code", author: "Robert C. Martin", issued: false },
    { id: 3, title: "Database Systems", author: "Raghu Ramakrishnan", issued: false }
];

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function addBook() {
    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();

    if (!title || !author) {
        alert("Please enter both book title and author name!");
        return;
    }

    books.push({
        id: Date.now(),
        title: title,
        author: author,
        issued: false
    });

    saveBooks();

    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";

    displayBooks();
}

function toggleIssue(id) {
    books = books.map(book =>
        book.id === id
            ? { ...book, issued: !book.issued }
            : book
    );

    saveBooks();
    displayBooks();
}

function deleteBook(id) {
    if (!confirm("Are you sure you want to delete this book?")) {
        return;
    }

    books = books.filter(book => book.id !== id);

    saveBooks();
    displayBooks();
}

function displayBooks() {
    const list = document.getElementById("bookList");
    const search = document.getElementById("search").value.toLowerCase();

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search)
    );

    list.innerHTML = "";

    if (filteredBooks.length === 0) {
        list.innerHTML = "<p>No books found.</p>";
        return;
    }

    filteredBooks.forEach(book => {
        const item = document.createElement("div");
        item.className = "book";

        const details = document.createElement("div");
        const title = document.createElement("h3");
        const author = document.createElement("p");
        const status = document.createElement("p");

        title.textContent = book.title;
        author.textContent = "Author: " + book.author;
        status.className = "status";
        status.textContent = book.issued ? "Issued" : "Available";

        details.append(title, author, status);

        const actions = document.createElement("div");

        const issueButton = document.createElement("button");
        issueButton.textContent = book.issued ? "Return" : "Issue";
        issueButton.onclick = () => toggleIssue(book.id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "5px";
        deleteButton.onclick = () => deleteBook(book.id);

        actions.append(issueButton, deleteButton);
        item.append(details, actions);
        list.appendChild(item);
    });
}

displayBooks();
```
