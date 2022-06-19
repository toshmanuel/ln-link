import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Spinner, Button, Modal, Accordion } from 'flowbite-react';
import { HiArrowCircleUp, HiArrowCircleDown, HiPlusCircle } from 'react-icons/hi';
import CreateAddressForm from '../components/forms/CreateAddressForm';

function ContactDetailsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [contactData, setContactData] = useState([]);
    const [loadedAddresses, setLoadedAddresses] = useState([]);
    const [openModal, setOpenModal] = useState(null);

    const params = useParams();
    
    // get contact info
    useEffect(() => {
        setIsLoading(true);
        // by default fetch is a GET request
        fetch('http://localhost:5000/api/v1/contacts/' + params.contactId
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                setContactData(data);
                console.log(data);
                setIsLoading(false);
                });
    }, []);

    // get contact's addresses
    useEffect(() => {
        setIsLoading(true);
        // by default fetch is a GET request
        fetch('http://localhost:5000/api/v1/addresses/contact/?contactId=' + params.contactId
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                const addresses = [];

                for (const key in data) {
                    const address = {
                        // get the key
                        id: key,
                        // push the key into the object to form proper json
                        ...data[key]
                    };
                    addresses.push(address);
                }


                setIsLoading(false);
                setLoadedAddresses(addresses);

            });
    }, []);

    const sortedAddresses = loadedAddresses.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    }).reverse();

    if (isLoading) {
        return (
            <div className="text-center">
                <Spinner aria-label="Getting contact info..." />
            </div>
        )
    }

    return (
            <>
            <div className="flex justify-between px-4 pt-4 mb-5">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white lg:text-4xl lg:font-extrabold lg:leading-snug 2xl:px-48">{contactData.name}</h2>
            <div className="flex justify-between px-4 pt-4 mb-5">
                <Button.Group outline={true}>
                    <Button gradientDuoTone="cyanToBlue">
                        <HiArrowCircleUp className="mr-3 h-4 w-4" />
                        {' '}Send
                    </Button>
                    <Button gradientDuoTone="cyanToBlue">
                        <HiArrowCircleDown className="mr-3 h-4 w-4" />
                        {' '}Receive
                    </Button>
                </Button.Group>
            </div>
        </div>
        <div>
        <div className="flex justify-between px-4 pt-4 mb-5">
            <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white lg:leading-snug">Addresses</h3>
            <React.Fragment>
                <Button size="sm" onClick={() => setOpenModal('default')}>
                <HiPlusCircle className="h-5 w-5 mr-3 text-white" /> Add address
                </Button>
                <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
                    <Modal.Header>New address</Modal.Header>
                    <Modal.Body>
                        <CreateAddressForm />
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        </div>
        <div className="mt-5">
        <Accordion flush={true}>
            {sortedAddresses.map(address => (
                <Accordion.Panel>
                <Accordion.Title>
                {address.label}
                </Accordion.Title>
                <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400 break-all">{address.address}</p>
                </Accordion.Content>
            </Accordion.Panel>
            ))}
        </Accordion>
        </div>
        </div>
        </>
    );
}

export default ContactDetailsPage;