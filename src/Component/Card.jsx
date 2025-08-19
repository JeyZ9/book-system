import React from "react";
import Swal from "sweetalert2"
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
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={props.img}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {props.title}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>
            {props.type}
          </p>
          <div className="card-actions justify-end">
        <a href={"/delete/"+ props.id} className="btn btn-outline btn-secondary">Delete</a>
        <a href={"/update/"+ props.id} className="btn btn-outline btn-primary">Edit</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;