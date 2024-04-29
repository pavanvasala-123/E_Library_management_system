import React, { useState, useEffect } from 'react';
import '../styles/sectionBooks.css';
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';



const BooksTable = () => {
    const {sectionId} = useParams()
  const [books, setBooks] = useState([]);
  const authToken = Cookies.get("token");
    if(!authToken){
      toast("user is not authorized")
    }

  useEffect(() => {
    // Fetch books data from the server
    const fetchData = async () => {
      try {

        let options = {
          headers:{
            Authorization: `Bearer ${authToken}`
          }
        }
        const response = await fetch(`http://localhost:3002/section/books/${sectionId}`,options);
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          console.error('Failed to fetch books');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="books-table-container">
      <h2>Books Table</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <table className="books-table">
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BooksTable;
