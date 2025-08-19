import React, { useState } from "react";
import Swal from "sweetalert2";
import NavBar from "../Component/NavBar";
import { useNavigate } from "react-router";
import axios from "axios";
const Form = () => {
  const [book, setBook] = useState({
    title: "",
    type: "",
    img: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async () => {
    // ตรวจสอบว่า input ไม่ว่าง
    if (!book.title || !book.type || !book.img) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Data",
        text: "Please fill in all fields!",
      });
      return;
    }

    try {
      const response = await axios("http://localhost:5000/books");
      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Book added successfully",
        });
        navigate("/");
        setBook({ title: "", type: "", img: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not add book",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    }
  };

  const handleCancel = () => {
    setBook({ title: "", type: "", img: "" });
    navigate("/");
  };

  return (
    <div className="container mx-auto">
      <NavBar />
      <h1 className="text-3xl text-center m-5 p-5">Add Book Form</h1>

      <div className="flex justify-center mb-4">
        <fieldset className="fieldset w-96">
          <legend className="fieldset-legend">Book Title:</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Title..."
            onChange={handleChange}
            value={book.title}
            name="title"
          />
        </fieldset>
      </div>

      <div className="flex justify-center mb-4">
        <fieldset className="fieldset w-96">
          <legend className="fieldset-legend">Book Type:</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Type..."
            onChange={handleChange}
            value={book.type}
            name="type"
          />
        </fieldset>
      </div>

      <div className="flex justify-center mb-4">
        <fieldset className="fieldset w-96">
          <legend className="fieldset-legend">Book Img URL:</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Image URL..."
            onChange={handleChange}
            value={book.img}
            name="img"
          />
        </fieldset>
      </div>

      {book.img && (
        <div className="flex justify-center mb-4">
          <img
            src={book.img}
            alt="Book preview"
            className="mt-4 max-w-xs max-h-64 object-contain border rounded"
            onError={(e) => {
              e.target.src = "";
            }}
          />
        </div>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <button
          className="btn btn-outline btn-primary"
          type="button"
          onClick={handleSubmit}
        >
          Add
        </button>
        <button
          className="btn btn-outline btn-secondary"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Form;
