import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Spinner, Button } from 'flowbite-react';
import { HiArrowCircleUp, HiPencilAlt } from 'react-icons/hi';

function AddressDetailsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [addressData, setAddressData] = useState([]);

    const params = useParams();

    // get address info
    useEffect(() => {
        setIsLoading(true);
        // by default fetch is a GET request
        fetch('http://localhost:5000/api/v1/addresses/' + params.addressId
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                setAddressData(data);
                console.log(data);
                setIsLoading(false);
                });
    }, [params.addressId,]);

    if (isLoading) {
        return (
            <div className="text-center">
                <Spinner aria-label="Getting address info..." />
            </div>
        )
    }

    return (
            <>
            <div className="flex justify-between pt-4 mb-5">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white lg:text-4xl lg:font-extrabold lg:leading-snug 2xl:px-48">{addressData.address}</h2>
                <div className="flex justify-between pt-4 mb-5">
                    <Button.Group outline={true}>
                        <Button gradientDuoTone="cyanToBlue">
                            <HiArrowCircleUp className="mr-3 h-4 w-4" />
                            {' '}Pay
                        </Button>
                        <Button gradientDuoTone="cyanToBlue">
                            <HiPencilAlt className="mr-3 h-4 w-4" />
                            {' '}Edit contact
                        </Button>
                    </Button.Group>
                </div>
            </div>
        </>
    );
}

export default AddressDetailsPage;