import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Card = (props) => {
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch("http://localhost:5000/books/" + id, {
          method: "Delete",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="overflow-hidden h-50">
        <img
          className="w-full object-cover"
          src={props.img}
          alt={`ปกหนังสือ: ${props.title}`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p>ประเภท: {props.type}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleDelete(props.id)}
            className="btn btn-error"
          >
            ลบ
          </button>
          <Link to={`/update/${props.id}`} className="btn btn-warning">
            แก้ไข
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
