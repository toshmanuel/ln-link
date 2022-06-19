import { Card, Avatar } from 'flowbite-react';

function ContactItem(props) {

    return (
        <li>
            <Card>
            <Avatar
                img={props.image}
                rounded={true}
                >
                <div className="space-y-1 font-medium dark:text-white">
                    <div>
                    {props.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                    # addresses
                    </div>
                </div>
                </Avatar>
            </Card>
        </li>
    )
}

export default ContactItem;