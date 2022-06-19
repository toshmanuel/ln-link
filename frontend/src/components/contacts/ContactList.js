import ContactItem from './ContactItem';

function ContactList(props) {

    const sortedContacts = props.contacts.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    }).reverse();
    
    return (
        <ul>
            {sortedContacts.map(contact => (
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