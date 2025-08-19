import React, { useState, useEffect } from "react";
import NavBar from "../Component/NavBar";
import Books from "../Component/Books";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleSearch = (keyword) => {
    if (!keyword) {
      setFilteredBooks(books);
      return;
    }
    const result = books.filter(
      (book) =>
        book.title.toLowerCase().includes(keyword.toLowerCase()) ||
        book.type.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredBooks(result);
  };

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="container mx-auto">
      <NavBar />
      <h1 className="title text-3xl text-center m-5 p-5">Book Library</h1>

      <div className="mb-5 flex justify-center items-center">
        <label className="input flex items-center gap-2 w-2xl">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search books..."
          />
        </label>
      </div>

      <Books books={filteredBooks} />
    </div>
  );
};

export default Home;
