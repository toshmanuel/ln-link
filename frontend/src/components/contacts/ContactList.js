import ContactItem from './ContactItem';

function ContactList(props) {
    return (
        <ul>
            {props.contacts.map(contact => (
                <ContactItem
                    key={contact.id}
                    id={contact.id}
                    image={contact.image}
                    name={contact.name}/>
            ))}
        </ul>
    );
}

export default ContactList;