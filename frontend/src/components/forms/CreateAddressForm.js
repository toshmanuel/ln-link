import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Button, TextInput, Label, Select } from 'flowbite-react';
import { addressOptions } from "../addresses/identifiers";
import { parseIdentifier } from "../../libs/validator";
const Swal = require("sweetalert2");

const CreateAddressForm = (props) => {
  const labelInputRef = React.createRef();
  const addressInputRef = React.createRef();

  const [isLoading, setIsLoading] = useState(false);
  const [addressType, setAddressType] = useState();

  const navigate = useNavigate();

  const params = useParams();

  const handleIdentifierInput = () => {
    const enteredAddress = addressInputRef.current.value;
    parseIdentifier(enteredAddress);
  }

  async function createAddressHandler(event) {
    event.preventDefault();

    const enteredLabel = labelInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;

    setIsLoading(true);
    fetch("http://localhost:5000/api/v1/addresses", {
      method: "POST",
      body: JSON.stringify({
        label: enteredLabel,
        address: enteredAddress,
        contactId: params.contactId
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
          navigate("/contacts/" + params.contactId, { replace: true });
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
    <form className="flex flex-col gap-4" onSubmit={createAddressHandler}>
      <div id="select">
  <div className="mb-2 block">
    <Label
      htmlFor="identifiers"
      value="Select address type"
    />
  </div>
  <Select id="identifiers" required={true} defaultValue="Select type" onChange={(e) => setAddressType(e.target.value)}>
    {addressOptions.map(option => {
      return (
        <option key={option.value}>
        {option.label}
      </option>
      )
    })}
  </Select>
</div>
  <div>
    <TextInput
      id="label"
      type="text"
      placeholder="Add a label for this address"
      required={true}
      ref={labelInputRef}
    />
    </div>
    <div className="mt-2">
  <textarea onChange={handleIdentifierInput} className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400" 
  rows="4" required 
  id="address" 
  ref={addressInputRef} 
  placeholder={`Paste ${addressType} here`} />
  </div>
  {!isLoading && <Button type="submit">Save</Button>}
  {isLoading && (
     <div className="text-center">
        <Spinner aria-label="Saving address ..." />
    </div>
    )}
</form>
  );
};

export default CreateAddressForm;
