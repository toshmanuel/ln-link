import { Accordion } from 'flowbite-react';
import AddressItem from './AddressItem';

function AddressList(props) {

    const sortedAddresses = props.addresses.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    }).reverse();
    
    return (
        <Accordion flush={true}>
            {sortedAddresses.map(address => (
                <AddressItem
                    key={address.id}
                    id={address.id}
                    address={address.address}
                    label={address.label}/>
            ))}
        </Accordion>
    );
}

export default AddressList;