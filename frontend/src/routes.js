import { HiUserGroup, HiLightningBolt, HiArrowCircleUp, HiArrowCircleDown } from "react-icons/hi";
import { BsCurrencyBitcoin } from "react-icons/bs";
import AllContactsPage from "./pages/AllContacts";
import ContactDetailsPage from "./pages/ContactDetails";
export const routes = [
    {
        title: 'All Contacts',
        icon: HiUserGroup,
        href: '/',
        component: <AllContactsPage />,
        group: false,
    },
    {
        title: '',
        href: '/contacts/:contactId',
        component: <ContactDetailsPage />,
        group: false,
    },
    {
        title: 'Activity',
        icon: HiLightningBolt,
        href: '/activity',
        component: <AllContactsPage />,
        group: false,
    },
    {
        title: 'Wallet',
        icon: BsCurrencyBitcoin,
        href: '/wallet',
        component: <AllContactsPage />,
        group: false,
    },
    {
        title: 'Send Payment',
        icon: HiArrowCircleUp,
        href: '/send',
        component: <AllContactsPage />,
        group: false,
    },
    {
        title: 'Request Payment',
        icon: HiArrowCircleDown,
        href: '/receive',
        component: <AllContactsPage />,
        group: false,
    }
]