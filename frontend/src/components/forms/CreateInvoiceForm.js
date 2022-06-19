import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Button, TextInput } from 'flowbite-react';
const Swal = require("sweetalert2");

const CreateInvoiceForm = (props) => {
  const amountInputRef = React.createRef();
  const descInputRef = React.createRef();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  async function createInvoiceHandler(event) {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredDescription = descInputRef.current.value;

    setIsLoading(true);
    fetch("http://localhost:5000/api/v1/invoices", {
      method: "POST",
      body: JSON.stringify({
        amount: enteredAmount,
        description: enteredDescription,
        addressId: params.addressId
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
            let errorMsg = "Something went wrong. Address was not created!";
            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {
        setTimeout(async () => {
          Swal.fire({
            title: "Address",
            text: "Address saved successfully",
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
          title: "Address",
          text: err.message,
          icon: "error",
          confirmButtonText: "Close",
          timer: 5000,
        });
      });
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={createInvoiceHandler}>
  <div>
    <TextInput
      id="amount"
      type="number"
      placeholder="Enter amount"
      required={true}
      ref={amountInputRef}
    />
    <TextInput
      id="description"
      type="text"
      placeholder="Add optional message"
      required={false}
      ref={descInputRef}
      sizing="lg"
    />
    </div>
  {!isLoading && <Button type="submit">Create invoice</Button>}
  {isLoading && (
     <div className="text-center">
        <Spinner aria-label="Saving address ..." />
    </div>
    )}
</form>
  );
};

export default CreateInvoiceForm;
