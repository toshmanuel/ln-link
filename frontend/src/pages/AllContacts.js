import React, { useState, useEffect } from 'react';
import { Spinner, Button, Modal, TextInput } from 'flowbite-react';
import ContactList from '../components/contacts/ContactList';
import { BsPlusCircle } from 'react-icons/bs';

function AllContactsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedContacts, setLoadedContacts] = useState([]);
    const [openModal, setOpenModal] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        // by default fetch is a GET request
        fetch('https://react-course-bdb27-default-rtdb.firebaseio.com/meetups.json'
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
                <Spinner aria-label="Center-aligned spinner example" />
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
                        <Modal.Header />
                        <Modal.Body>
                        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Let's start with their name
                            </h3>
                            <div>
                            <TextInput
                                id="name"
                                className="dark:border-gray-500 dark:bg-gray-600"
                                placeholder="Satoshi Nakamoto"
                                required={true}
                            />
                            </div>

                            <div className="w-full">
                            <Button onClick={() => setOpenModal(undefined)}>
                                Create contact
                            </Button>
                            </div>
                        </div>
                        </Modal.Body>
                    </Modal>
                </React.Fragment>
            </div>
            <ContactList contacts={loadedContacts} />
        </section>
    );
}

export default AllContactsPage;