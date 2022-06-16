import ContactList from "./pages/ContactList";
import { HiHome } from "react-icons/hi";
import AddNewContact from "./pages/AddNewContact";
export const routes = [
    {
        title: 'All Contacts',
        icon: HiHome,
        href: '/',
        component: <ContactList />,
        group: false,
    },
    {
        title: 'Add new contact',
        icon: HiHome,
        href: '/add',
        component: <AddNewContact />,
        group: false,
    }
]