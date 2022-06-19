import { Accordion } from 'flowbite-react';

function AddressItem(props) {

    return (
        <Accordion.Panel>
            <Accordion.Title>
            {props.label}
            </Accordion.Title>
            <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
                {props.address}
            </p>
            </Accordion.Content>
        </Accordion.Panel>
    )
}

export default AddressItem;