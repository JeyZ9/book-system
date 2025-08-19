import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../Component/NavBar";
import Swal from "sweetalert2";
import axios from "axios";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: "", type: "", img: "" });

  useEffect(() => {
    fetch(`http://localhost:5000/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error(err.message));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async () => {
    if (!book.title || !book.type || !book.img) {
      await Swal.fire({
        icon: "warning",
        title: "Incomplete Data",
        text: "Please fill in all fields!",
      });
      return;
    }

    try {
      // const response = await fetch(`http://localhost:5000/books/${id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(book),
      // }).then((res) => {
      //   if (res.ok) {
      //     Swal.fire({
      //       icon: "success",
      //       title: "Success!",
      //       text: "Book updated successfully",
      //     });
      //   }

      // });

      const response = await axios(`http://localhost:5000/books/${id}`);
      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Book updated successfully",
        });
        navigate("/");
      } else {
        await Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not update book",
        });
      }
      console.log("STATUS: ", response);
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    }
  };

  return (
    <div className="container mx-auto">
      <NavBar />
      <h1 className="text-3xl text-center m-5 p-5">Book Update Form</h1>

      {["title", "type", "img"].map((field) => (
        <div key={field} className="flex justify-center mb-4">
          <fieldset className="fieldset w-96">
            <legend className="fieldset-legend">
              Book {field.charAt(0).toUpperCase() + field.slice(1)}:
            </legend>
            <input
              type="text"
              className="input w-full"
              placeholder={`${
                field.charAt(0).toUpperCase() + field.slice(1)
              }...`}
              name={field}
              value={book[field]}
              onChange={handleChange}
            />
          </fieldset>
        </div>
      ))}

      {book.img && (
        <div className="flex justify-center mb-4">
          <img
            src={book.img}
            alt="Book preview"
            className="mt-4 max-w-xs max-h-64 object-contain border rounded"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
        </div>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <button
          type="button"
          className="btn btn-outline btn-primary"
          onClick={handleSubmit}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-outline btn-secondary"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Update;
