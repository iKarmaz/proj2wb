const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


function readData() {
    const data = fs.readFileSync("data.json");
    return JSON.parse(data);
}


function writeData(data) {
    fs.writeFileSync(
        "data.json",
        JSON.stringify(data, null, 2)
    );
}


// GET all books
app.get("/books", (req, res) => {
    res.json(readData());
});


// GET one book
app.get("/books/:id", (req, res) => {

    const books = readData();

    const book = books.find(
        b => b.id == req.params.id
    );

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.json(book);
});


// POST new book
app.post("/books", (req, res) => {

    const books = readData();

    const newBook = {
        id: Date.now(),
        title: req.body.title,
        author: req.body.author
    };

    books.push(newBook);

    writeData(books);

    res.status(201).json(newBook);
});


// PUT update book
app.put("/books/:id", (req, res) => {

    const books = readData();

    const index = books.findIndex(
        b => b.id == req.params.id
    );


    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }


    books[index].title = req.body.title;
    books[index].author = req.body.author;

    writeData(books);

    res.json(books[index]);
});


// DELETE book
app.delete("/books/:id", (req, res) => {

    const books = readData();

    const filteredBooks = books.filter(
        b => b.id != req.params.id
    );

    writeData(filteredBooks);

    res.json({
        message: "Book deleted"
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});