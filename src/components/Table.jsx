import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Table = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("https://65eaa92fc9bf92ae3d3bdd5a.mockapi.io/api/commerce/user")
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEditUser = (id)=>{
    navigate(`/editUser/${id}`);
  }

  const handleDelete = (id) => { 
    axios
      .delete(
        `https://65eaa92fc9bf92ae3d3bdd5a.mockapi.io/api/commerce/user/${id}`
      )
      .then((response) => {
        console.log("Deleted Element", response.data);
        axios
          .get("https://65eaa92fc9bf92ae3d3bdd5a.mockapi.io/api/commerce/user")
          .then((response) => {
            setData(response.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log("error occured", error);
        window.alert("An error occured while deleting the element");
      });
  };

  return (
    <>
      <table className="table table-dark table-striped-columns">
        <thead>
          <tr>
            <th scope="col">Sr.No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>{item.phoneNumber}</td>
              <td>
                <button type="button" className="btn btn-success m-1" onClick={()=>handleEditUser(item.id)}>
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger m-1"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
