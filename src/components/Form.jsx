import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
  });
  const location = useLocation();
  let formHeadingText = "";
  let saveButtonText = "";

  useEffect(()=>{
    axios
    .get(`https://65eaa92fc9bf92ae3d3bdd5a.mockapi.io/api/commerce/user/${params.id}`)
    .then((response) => {
      console.log("Edit user data", response.data);
      setUserData(response.data) 
    }
    )
    .catch((err) => console.log(err));
  },[params.id])

  if (location.pathname.includes("createUser")) {
    formHeadingText = "Create User";
    saveButtonText = "Save New User";
  } else if (location.pathname.includes("editUser")) {
    formHeadingText = "Edit User";
    saveButtonText = "Save Edited User";
    // axios
    //   .get(`https://65eaa92fc9bf92ae3d3bdd5a.mockapi.io/api/commerce/user/${params.id}`)
    //   .then((response) => {
    //     console.log("Edit user data", response.data);
    //     setUserData(response.data) 
    //   }
    //   )
    //   .catch((err) => console.log(err));
  }

  const handleTextFieldChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSaveButton = () => {
    if (location.pathname.includes("createUser")) {
      axios
        .post(
          "https://65eaa92fc9bf92ae3d3bdd5a.mockapi.io/api/commerce/user",
          userData
        )
        .catch((error) => window.alert("error", error));
    } else if (location.pathname.includes("editUser")) {
      console.log("edituser");
      console.log("User data for post request", userData)
      axios
        .put(
          `https://65eaa92fc9bf92ae3d3bdd5a.mockapi.io/api/commerce/user/${params.id}`,
          userData
        )
        .then(()=>console.log("Post request successful"))
        .catch((error) => window.alert("error", error));
    }
    navigate("/");
  };

  return (
    <>
      <div>
        <b
          className="fs-2 mt-3 text-primary "
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {formHeadingText}
        </b>
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 2, width: "97%" },
          }}
          noValidate
          autoComplete="off"
          className="mb-3"
        >
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            type="text"
            name="name"
            value={userData.name}
            onChange={(event) => handleTextFieldChange(event)}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={userData.email}
            onChange={(event) => handleTextFieldChange(event)}
          />
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            type="text"
            name="address"
            value={userData.address}
            onChange={(event) => handleTextFieldChange(event)}
          />
          <TextField
            id="phoneNumber"
            label="PhoneNumber"
            variant="outlined"
            type="number"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={(event) => handleTextFieldChange(event)}
          />
        </Box>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={() => handleSaveButton()}
        >
          {saveButtonText}
        </Button>
      </div>
    </>
  );
};

export default Form;

