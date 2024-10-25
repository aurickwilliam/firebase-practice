import { useEffect, useState } from 'react'

import Auth from './components/Auth'
import { db } from './config/firebase'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore'

function App() {
  const [bookList, setBookList] = useState([]);

  //New Book
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [bookLocation, setBookLocation] = useState(0);

  // Update
  const [newBookTitle, setNewBookTitle] = useState("");

  // Reference doon sa db sa firestore
  // ref sa db, pangalan ng db
  const bookCollectionRef = collection(db, "books");

  const getBookList = async () => {
    try {
      const data = await getDocs(bookCollectionRef);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id,}))
      console.log(filteredData);
      setBookList(filteredData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getBookList();
  }, [])

  const addBook = async () => {
    try {
      await addDoc(bookCollectionRef, {
        title: bookTitle,
        author: bookAuthor,
        genre: bookGenre,
        deweyDecimal: bookLocation
      })
      getBookList();
    } catch (err) {
      console.error(err);
    }
  }

  const deleteBook = async (id) => {
    try {
      const bookDoc = doc(db, "books", id);
      await deleteDoc(bookDoc);
      getBookList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateBookTitle = async (id) => {
    try {
      const bookDoc = doc(db, "books", id);
      await updateDoc(bookDoc, {title: newBookTitle});
      getBookList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Auth></Auth>
      <br />
      <div>
        <input type="text" placeholder='title...' onChange={(e) => setBookTitle(e.target.value)}/>
        <input type="text" placeholder='author...'  onChange={(e) => setBookAuthor(e.target.value)}/>
        <input type="text" placeholder='genre...'  onChange={(e) => setBookGenre(e.target.value)}/>
        <input type="number" placeholder='location...'  onChange={(e) => setBookLocation(Number(e.target.value))}/>
        <button onClick={addBook}>Submit</button>
      </div>

      <div>
        {bookList.map((book) => (
          <div>
            <h1>{book.title}</h1>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Location: {book.deweyDecimal}</p>
            <button onClick={() => deleteBook(book.id)}>Delete Entry</button>

            <br />
            <input type="text" placeholder='update title...' onChange={(e) => setNewBookTitle(e.target.value)}/>
            <button onClick={() => updateBookTitle(book.id)}>Update Title</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
