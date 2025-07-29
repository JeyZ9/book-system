import React from "react";
import Card from "./Card";

const Books = (props) => {
  const { books } = props;
  return (
    <div className="flex">
      <div className="flex flex-wrap justify-center gap-4">
        {books &&
          books.map((book) => (
            <Card
              key={book.id}
              id={book.id}
              title={book.title}
              type={book.type}
              img={book.img}
            />
          ))}
      </div>
    </div>
  );
};

export default Books;
