import { useEffect, useState } from "react";

function App() {

  const [books, setBooks] = useState([]);

  const [title, setTitle] = useState("");

  const [author, setAuthor] = useState("");

  const [editId, setEditId] = useState(null);


  useEffect(() => {
    getBooks();
  }, []);


  async function getBooks() {

    const response = await fetch(
      "http://localhost:3000/books"
    );

    const data = await response.json();

    setBooks(data);

  }


  async function addBook() {

    await fetch(
      "http://localhost:3000/books",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          title: title,
          author: author
        })
      }
    );


    setTitle("");
    setAuthor("");

    getBooks();

  }

async function updateBook() {

  await fetch(
    `http://localhost:3000/books/${editId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        title: title,
        author: author
      })
    }
  );


  setTitle("");

  setAuthor("");

  setEditId(null);

  getBooks();

}


  async function deleteBook(id) {

    await fetch(
      `http://localhost:3000/books/${id}`,
      {
        method: "DELETE"
      }
    );


    getBooks();

  }



  return (

    <div>

      <h1>Book Library</h1>


      <input
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />


      <br />


      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />


      <br />


      <button onClick={addBook}>
        Add Book
      </button>


      <h2>Books:</h2>


      {
        books.map((book) => (

          <div key={book.id}>

            <p>
              {book.title} - {book.author}

              <button
                onClick={() => deleteBook(book.id)}
              >
                Delete
              </button>

            </p>

          </div>

        ))
      }


    </div>

  );
}


export default App;