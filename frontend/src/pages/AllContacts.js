import React, { useState, useEffect } from 'react';
import { Spinner, Button, Modal, Alert } from 'flowbite-react';
import ContactList from '../components/contacts/ContactList';
import { BsPlusCircle } from 'react-icons/bs';
import { HiInformationCircle } from 'react-icons/hi';
import CreateContactForm from '../components/forms/CreateContactForm';

function AllContactsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedContacts, setLoadedContacts] = useState([]);
    const [openModal, setOpenModal] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        // by default fetch is a GET request
        fetch('http://localhost:5000/api/v1/contacts'
        )
            .then(response => {
                return response.json();
            })
            .then(data => {
                const contacts = [];

                for (const key in data) {
                    const contact = {
                        // get the key
                        id: key,
                        // push the key into the object to form proper json
                        ...data[key]
                    };
                    contacts.push(contact);
                }


                setIsLoading(false);
                setLoadedContacts(contacts);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="text-center">
                <Spinner aria-label="Checking..." />
            </div>
        )
    }

    return (
        <section>
            <div className="flex justify-between px-4 pt-4 mb-5">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white lg:text-4xl lg:font-extrabold lg:leading-snug 2xl:px-48">All Contacts</h2>
                <React.Fragment>
                    <Button onClick={() => setOpenModal('default')}>
                    <BsPlusCircle className="h-5 w-5 mr-3 text-white" /> Add new
                    </Button>
                    <Modal show={openModal === 'default'} onClose={() => setOpenModal(undefined)}>
                        <Modal.Header>Add contact</Modal.Header>
                        <Modal.Body>
                            <CreateContactForm />
                        </Modal.Body>
                    </Modal>
                </React.Fragment>
            </div>
            {loadedContacts ? (<ContactList contacts={loadedContacts} />) : (
                <Alert
                color="info"
                additionalContent={
                <React.Fragment>
                    <div className="mt-2 mb-4 text-sm text-blue-700 dark:text-blue-800">
                        Send and receive easily, and keep your contacts and payments organized. 
                    </div>
                </React.Fragment>}
                icon={HiInformationCircle}
              >
                <h3 className="text-xl font-medium text-blue-700 dark:text-blue-800">
                  Add your first contact
                </h3>
              </Alert>
            )}
        </section>
    );
}

export default AllContactsPage;