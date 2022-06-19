import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Button, TextInput } from 'flowbite-react';
const Swal = require("sweetalert2");

const CreateContactForm = (props) => {
  const nameInputRef = React.createRef();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;

    setIsLoading(true);
    fetch("http://localhost:5000/api/v1/contacts", {
      method: "POST",
      body: JSON.stringify({
        name: enteredName,
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMsg = "Something went wrong. Contact was not created!";
            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {
        setTimeout(async () => {
          Swal.fire({
            title: "Contact",
            text: "Contact saved successfully",
            icon: "success",
            confirmButtonText: "Close",
            timer: 5000,
          });
          setIsLoading(false);
          navigate.replace("/");
        }, 2000);
      })
      .catch((err) => {
        setIsLoading(false);
        Swal.fire({
          title: "Contact",
          text: err.message,
          icon: "error",
          confirmButtonText: "Close",
          timer: 5000,
        });
      });
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={submitHandler}>
  <div>
    <TextInput
      id="name"
      type="text"
      placeholder="Contact's name"
      required={true}
      ref={nameInputRef}
      helperText={<React.Fragment>Use an alias if you can.</React.Fragment>}
    />
  </div>
  {!isLoading && <Button type="submit">Submit</Button>}
  {isLoading && (
     <div className="text-center">
        <Spinner aria-label="Saving contact ..." />
    </div>
    )}
</form>
  );
};

export default CreateContactForm;
